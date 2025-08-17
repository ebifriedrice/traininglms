import { Course } from '../../models/Course.js';
import { User } from '../../models/User.js';

export default {
  Query: {
    async me(_: any, __: any, ctx: any) {
      if (!ctx.user) return null;
      return await User.findById(ctx.user.uid);
    },
    async courseBySlug(_: any, { slug }: any) {
      return await Course.findOne({ slug }).populate('lessons');
    },
    async listCourses(_: any, { pagination }: any) {
      const page = pagination?.page ?? 1;
      const limit = pagination?.limit ?? 20;
      return await Course.find().sort({ createdAt: -1 }).skip((page-1)*limit).limit(limit).populate('lessons');
    }
  }
};
