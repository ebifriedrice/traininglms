import { AuthenticationError, ForbiddenError } from 'apollo-server-core';
import { User } from '../../models/User.js';
import { Course } from '../../models/Course.js';
import { Lesson } from '../../models/Lesson.js';
import { Enrollment } from '../../models/Enrollment.js';
import { Certificate } from '../../models/Certificate.js';
import { verifyPassword, hashPassword } from '../../utils/crypto.js';
import { signToken } from '../../utils/jwt.js';
import { v4 as uuidv4 } from 'uuid';

function ensureAdmin(ctx: any) {
  if (!ctx.user) throw new AuthenticationError('Unauthorized');
  if (ctx.user.role !== 'ADMIN') throw new ForbiddenError('Forbidden');
}

export default {
  Query: {
    async adminListUsers(_: any, __: any, ctx: any) {
      ensureAdmin(ctx);
      return await User.find().sort({ createdAt: -1 });
    },
    async adminListCourses(_: any, __: any, ctx: any) {
      ensureAdmin(ctx);
      return await Course.find().populate('lessons');
    }
  },
  Mutation: {
    async adminLogin(_: any, { email, password }: any) {
      const user = await User.findOne({ email, role: 'ADMIN' });
      if (!user) throw new AuthenticationError('Invalid credentials');
      if (!verifyPassword(password, user.passwordHash)) throw new AuthenticationError('Invalid credentials');
      const sessionId = uuidv4();
      user.sessionId = sessionId;
      await user.save();
      const token = signToken({ uid: String(user._id), role: 'ADMIN', sessionId });
      return { token, user };
    },
    async adminCreateCourse(_: any, { input }: any, ctx: any) {
      ensureAdmin(ctx);
      const course = await Course.create({ ...input });
      return await course.populate('lessons');
    },
    async adminUpdateCourse(_: any, { id, input }: any, ctx: any) {
      ensureAdmin(ctx);
      const course = await Course.findByIdAndUpdate(id, { $set: { ...input } }, { new: true });
      return await course!.populate('lessons');
    },
    async adminCreateLesson(_: any, { input }: any, ctx: any) {
      ensureAdmin(ctx);
      const lesson = await Lesson.create({
        course: input.courseId,
        title: input.title,
        order: input.order ?? 0,
        videoPublicId: input.videoPublicId,
        durationSec: input.durationSec ?? 0
      });
      await Course.findByIdAndUpdate(input.courseId, { $push: { lessons: lesson._id } });
      return lesson;
    },
    async adminUpdateLesson(_: any, { id, input }: any, ctx: any) {
      ensureAdmin(ctx);
      const lesson = await Lesson.findByIdAndUpdate(id, {
        $set: {
          title: input.title,
          order: input.order,
          videoPublicId: input.videoPublicId,
          durationSec: input.durationSec
        }
      }, { new: true });
      return lesson;
    },
    async adminRemoveLesson(_: any, { id }: any, ctx: any) {
      ensureAdmin(ctx);
      const lesson = await Lesson.findById(id);
      if (!lesson) return true;
      await Course.findByIdAndUpdate(lesson.course, { $pull: { lessons: lesson._id } });
      await lesson.deleteOne();
      return true;
    },
    async adminCreateStudent(_: any, { name, email, temporaryPassword }: any, ctx: any) {
      ensureAdmin(ctx);
      const password = temporaryPassword || 'Pass@12345';
      const user = await User.create({
        name, email, role: 'STUDENT', passwordHash: hashPassword(password)
      });
      return user;
    },
    async adminEnrollStudent(_: any, { studentId, courseId }: any, ctx: any) {
      ensureAdmin(ctx);
      await (await import('../../models/Enrollment.js')).Enrollment.create({ student: studentId, course: courseId });
      return true;
    },
    async adminIssueCertificate(_: any, { studentId, courseId }: any, ctx: any) {
      ensureAdmin(ctx);
      const serial = 'XYZ-' + Math.random().toString(36).slice(2, 10).toUpperCase();
      const cert = await Certificate.create({ student: studentId, course: courseId, serial });
      return cert;
    }
  }
};
