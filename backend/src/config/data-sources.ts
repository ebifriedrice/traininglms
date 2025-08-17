import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { ENV } from '@config/env';
import { Admin } from '@entities/Admin';
import { Student } from '@entities/Student';
import { Session } from '@entities/Session';
import { Page } from '@entities/Page';
import { BlogPost } from '@entities/BlogPost';
import { TeamMember } from '@entities/TeamMember';
import { GalleryItem } from '@entities/GalleryItem';
import { Notice } from '@entities/Notice';
import { ContactProfile } from '@entities/ContactProfile';
import { Course } from '@entities/Course';
import { Lesson } from '@entities/Lesson';
import { Enrollment } from '@entities/Enrollment';
import { Progress } from '@entities/Progress';
import { Certificate } from '@entities/Certificate';

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: ENV.DB_SQLITE_PATH,
    synchronize: true, // dev only
    logging: false,
    entities: [
        Admin, Student, Session,
        Page, BlogPost, TeamMember, GalleryItem, Notice, ContactProfile,
        Course, Lesson, Enrollment, Progress, Certificate
    ],
    migrations: [],
    subscribers: [],
});
