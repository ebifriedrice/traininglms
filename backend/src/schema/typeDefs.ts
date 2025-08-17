import { gql } from 'graphql-tag';

export const typeDefs = gql`
  scalar Date

  enum UserRole { ADMIN STUDENT }
  enum DeliveryMode { ONLINE OFFLINE HYBRID }
  enum EnrollmentStatus { ACTIVE COMPLETED }

  type User {
    id: ID!
    name: String!
    email: String!
    role: UserRole!
    phone: String
    address: String
    createdAt: Date!
    updatedAt: Date!
  }

  type CoursePDF { title: String, publicId: String }

  type Lesson {
    id: ID!
    course: ID!
    title: String!
    order: Int!
    videoPublicId: String
    durationSec: Int!
  }

  type Course {
    id: ID!
    title: String!
    slug: String!
    description: String
    instructor: String
    price: Float!
    discountPrice: Float
    saleEndsAt: Date
    deliveryMode: DeliveryMode!
    durationHours: Int
    outcomes: [String!]
    prerequisites: [String!]
    sampleVideoPublicId: String
    samplePdfPublicId: String
    lessons: [Lesson!]!
    pdfs: [CoursePDF!]
    createdAt: Date!
    updatedAt: Date!
  }

  type Enrollment {
    id: ID!
    student: ID!
    course: ID!
    status: EnrollmentStatus!
    completionByAdmin: Boolean!
    createdAt: Date!
  }

  type Progress {
    id: ID!
    student: ID!
    course: ID!
    lesson: ID!
    secondsWatched: Int!
    completed: Boolean!
  }

  type Certificate {
    id: ID!
    student: ID!
    course: ID!
    serial: String!
    issuedAt: Date!
  }

  type PageContent { id: ID!, key: String!, sections: JSON }
  scalar JSON

  type BlogPost {
    id: ID!
    title: String!
    slug: String!
    body: String
    tags: [String!]
    published: Boolean!
    createdAt: Date!
    updatedAt: Date!
  }

  type TeamMember { id: ID!, name: String!, designation: String, photoUrl: String }
  type Notice { id: ID!, message: String!, active: Boolean! }
  type GalleryItem { id: ID!, title: String, imageUrl: String }

  type AuthPayload { token: String!, user: User! }

  input PaginationInput { page: Int, limit: Int }

  # Admin Inputs
  input CourseInput {
    title: String!
    slug: String!
    description: String
    instructor: String
    price: Float
    discountPrice: Float
    saleEndsAt: Date
    deliveryMode: DeliveryMode!
    durationHours: Int
    outcomes: [String!]
    prerequisites: [String!]
    sampleVideoPublicId: String
    samplePdfPublicId: String
    pdfs: [CoursePDFInput!]
  }

  input CoursePDFInput { title: String, publicId: String }

  input LessonInput {
    courseId: ID!
    title: String!
    order: Int
    videoPublicId: String
    durationSec: Int
  }

  type Query {
    me: User
    courseBySlug(slug: String!): Course
    listCourses(pagination: PaginationInput): [Course!]!
    adminListUsers: [User!]!
    adminListCourses: [Course!]!
  }

  type Mutation {
    # Auth
    adminLogin(email: String!, password: String!): AuthPayload!
    studentRegister(name: String!, email: String!, password: String!): AuthPayload!
    studentLogin(email: String!, password: String!): AuthPayload!

    # Admin — Course & Lesson
    adminCreateCourse(input: CourseInput!): Course!
    adminUpdateCourse(id: ID!, input: CourseInput!): Course!
    adminCreateLesson(input: LessonInput!): Lesson!
    adminUpdateLesson(id: ID!, input: LessonInput!): Lesson!
    adminRemoveLesson(id: ID!): Boolean!

    # Admin — Users & Enrollment
    adminCreateStudent(name: String!, email: String!, temporaryPassword: String): User!
    adminEnrollStudent(studentId: ID!, courseId: ID!): Boolean!
    adminIssueCertificate(studentId: ID!, courseId: ID!): Certificate!

    # Student — Progress
    markLessonProgress(courseId: ID!, lessonId: ID!, secondsWatched: Int!, completed: Boolean): Boolean!
  }
`;
