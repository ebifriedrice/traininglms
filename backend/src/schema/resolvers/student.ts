import { AuthenticationError } from 'apollo-server-core';
import { User } from '../../models/User.js';
import { verifyPassword, hashPassword } from '../../utils/crypto.js';
import { signToken } from '../../utils/jwt.js';
import { Progress } from '../../models/Progress.js';

export default {
  Mutation: {
    async studentRegister(_: any, { name, email, password }: any) {
      const exists = await User.findOne({ email });
      if (exists) throw new AuthenticationError('Email already registered');
      const user = await User.create({ name, email, role: 'STUDENT', passwordHash: hashPassword(password) });
      const token = signToken({ uid: String(user._id), role: 'STUDENT', sessionId: 'self' });
      return { token, user };
    },
    async studentLogin(_: any, { email, password }: any) {
      const user = await User.findOne({ email, role: 'STUDENT' });
      if (!user || !verifyPassword(password, user.passwordHash)) throw new AuthenticationError('Invalid credentials');
      const token = signToken({ uid: String(user._id), role: 'STUDENT', sessionId: 'self' });
      return { token, user };
    },
    async markLessonProgress(_: any, { courseId, lessonId, secondsWatched, completed }: any, ctx: any) {
      if (!ctx.user) throw new AuthenticationError('Unauthorized');
      const doc = await Progress.findOneAndUpdate(
        { student: ctx.user.uid, lesson: lessonId },
        { $set: { course: courseId, secondsWatched, completed: !!completed } },
        { upsert: true, new: true }
      );
      return !!doc;
    }
  }
};
