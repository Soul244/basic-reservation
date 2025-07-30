import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  date,
  boolean,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Missing Parts:
// "settings": {
//   "username": "jasondoe",
//   "password": "Password@123",
//   "notifications": true,
//   "calendarView": "default"
// }
export const admins = pgTable('admins', {
  id: serial('id').primaryKey(),
  firstName: varchar('firstName', { length: 100 }).notNull(),
  lastName: varchar('lastName', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 255 }).notNull().unique(),
  address: varchar('address', { length: 255 }).notNull(),
  city: varchar('city', { length: 255 }).notNull(),
  zip: varchar('zip', { length: 50 }).notNull(),
  notes: varchar('notes', { length: 255 }).notNull(),
  timezone: varchar('timezone', { length: 255 }).notNull(),
  language: varchar('language', { length: 50 }).notNull(),
  ldapDn: varchar('ldapDn', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
});

export const appointments = pgTable('appointments', {
  id: serial('id').primaryKey(),
  book: date('book').notNull(),
  start: date('start').notNull(),
  end: date('end').notNull(),
  hash: varchar('hash', { length: 20 }).notNull(),
  location: varchar('location', { length: 255 }).notNull(),
  color: varchar('color', { length: 255 }).notNull(),
  status: varchar('status', { length: 20 }).notNull(), // Strictly defined statuses like 'pending', 'confirmed', 'cancelled'
  notes: text('notes'),
  customerId: integer('customer_id').references(() => customers.id), // Foreign key to customers table
  providerId: integer('provider_id').references(() => providers.id), // Foreign key to providers table
  serviceId: integer('service_id').references(() => services.id), // Foreign key to services table
  googleCalendarId: varchar('google_calendar_id', { length: 255 }),
  caldavCalendarId: varchar('caldav_calendar_id', { length: 255 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
});

export const availabilities = pgTable('availabilities', {
  id: serial('id').primaryKey(),
  start: timestamp('start').notNull(),
  end: timestamp('end').notNull(),
  providerId: integer('provider_id').references(() => providers.id), // Foreign key to providers table
  serviceId: integer('service_id').references(() => services.id), // Foreign key to services table
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
});

export const customers = pgTable('customers', {
  id: serial('id').primaryKey(),
  firstName: varchar('firstName', { length: 100 }).notNull(),
  lastName: varchar('lastName', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 255 }).notNull().unique(),
  address: varchar('address', { length: 255 }).notNull().unique(),
  city: varchar('city', { length: 255 }).notNull().unique(),
  zip: varchar('zip', { length: 50 }).notNull().unique(),
  timezone: varchar('timezone', { length: 255 }).notNull().unique(),
  language: varchar('language', { length: 50 }).notNull().unique(),
  ldapDn: varchar('ldapDn', { length: 255 }).notNull().unique(), // Do we need this?
  notes: varchar('notes', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
});

// Missing Parts:

// "services": [],
//       "settings": {
//   "username": "chrisdoe",
//     "password": "Password@123",
//       "notifications": true,
//         "calendarView": "default",
//           "googleSync": false,
//             "googleCalendar": null,
//               "googleToken": null,
//                 "caldavSync": false,
//                   "caldavUrl": null,
//                     "caldavUsername": null,
//                       "caldavPassword": null,
//                         "syncFutureDays": 90,
//                           "syncPastDays": 30,
//   "workingPlan": {
//     "sunday": null,
//       "monday": {
//       "start": "09:00",
//         "end": "17:00",
//           "breaks": []
//     },
//     "tuesday": {
//       "start": "09:00",
//         "end": "17:00",
//           "breaks": []
//     },
//     "wednesday": {
//       "start": "09:00",
//         "end": "17:00",
//           "breaks": []
//     },
//     "thursday": {
//       "start": "09:00",
//         "end": "17:00",
//           "breaks": []
//     },
//     "friday": {
//       "start": "09:00",
//         "end": "17:00",
//           "breaks": []
//     },
//     "saturday": null
//   }
// }
export const providers = pgTable('providers', {
  id: serial('id').primaryKey(),
  firstName: varchar('firstName', { length: 100 }),
  lastName: varchar('lastName', { length: 100 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 255 }).notNull().unique(),
  address: varchar('address', { length: 255 }).notNull(),
  city: varchar('city', { length: 255 }).notNull(),
  zip: varchar('zip', { length: 50 }).notNull(),
  timezone: varchar('timezone', { length: 255 }).notNull(),
  language: varchar('language', { length: 50 }).notNull(),
  ldapDn: varchar('ldapDn', { length: 255 }).notNull(),
  notes: varchar('notes', { length: 255 }).notNull(),
  isPrivate: boolean('is_private').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
});

// Missing Parts:
// "providers": [],
// "settings": {
//   "username": "jessydoe",
//     "password": "Password@123",
//       "notifications": true,
//         "calendarView": "default"
// }
export const secretaries = pgTable('secretaries', {
  id: serial('id').primaryKey(),
  firstName: varchar('firstName', { length: 100 }),
  lastName: varchar('lastName', { length: 100 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 255 }).notNull().unique(),
  address: varchar('address', { length: 255 }).notNull(),
  city: varchar('city', { length: 255 }).notNull(),
  zip: varchar('zip', { length: 50 }).notNull(),
  notes: varchar('notes', { length: 255 }).notNull(),
  timezone: varchar('timezone', { length: 255 }).notNull(),
  language: varchar('language', { length: 50 }).notNull(),
  ldapDn: varchar('ldapDn', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
});

export const servicesCategories = pgTable('services_categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const services = pgTable('services', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  duration: integer('duration').notNull(), // Duration in minutes
  price: integer('price').notNull(), // Price in cents
  currency: varchar('currency', { length: 10 }).notNull().default('USD'),
  location: varchar('location', { length: 255 }),
  description: text('description'),
  availabilitiesType: varchar('availabilities_type', { length: 50 }).notNull().default('fixed'), // 'fixed' or 'flexible'
  attendantsNumber: integer('attendants_number').notNull().default(1), // Number of attendants required
  isPrivate: boolean('is_private').notNull().default(false),
  serviceCategoryId: integer('service_category_id')
    .notNull()
    .references(() => servicesCategories.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
});

export const settings = pgTable('settings', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  value: text('value').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
});

export const unavailabilities = pgTable('unavailabilities', {
  id: serial('id').primaryKey(),
  book: date('book').notNull(),
  start: timestamp('start').notNull(),
  end: timestamp('end').notNull(),
  hash: varchar('hash', { length: 20 }).notNull(),
  location: varchar('location', { length: 255 }).notNull(),
  notes: text('notes'),
  providerId: integer('provider_id')
    .notNull()
    .references(() => providers.id),
  googleCalendarId: varchar('google_calendar_id', { length: 255 }),
  caldavCalendarId: varchar('caldav_calendar_id', { length: 255 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
});

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: varchar('role', { length: 20 }).notNull().default('member'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
});

export const teams = pgTable('teams', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  stripeCustomerId: text('stripe_customer_id').unique(),
  stripeSubscriptionId: text('stripe_subscription_id').unique(),
  stripeProductId: text('stripe_product_id'),
  planName: varchar('plan_name', { length: 50 }),
  subscriptionStatus: varchar('subscription_status', { length: 20 }),
});

export const teamMembers = pgTable('team_members', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  teamId: integer('team_id')
    .notNull()
    .references(() => teams.id),
  role: varchar('role', { length: 50 }).notNull(),
  joinedAt: timestamp('joined_at').notNull().defaultNow(),
});

export const activityLogs = pgTable('activity_logs', {
  id: serial('id').primaryKey(),
  teamId: integer('team_id')
    .notNull()
    .references(() => teams.id),
  userId: integer('user_id').references(() => users.id),
  action: text('action').notNull(),
  timestamp: timestamp('timestamp').notNull().defaultNow(),
  ipAddress: varchar('ip_address', { length: 45 }),
});

export const invitations = pgTable('invitations', {
  id: serial('id').primaryKey(),
  teamId: integer('team_id')
    .notNull()
    .references(() => teams.id),
  email: varchar('email', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).notNull(),
  invitedBy: integer('invited_by')
    .notNull()
    .references(() => users.id),
  invitedAt: timestamp('invited_at').notNull().defaultNow(),
  status: varchar('status', { length: 20 }).notNull().default('pending'),
});

export const teamsRelations = relations(teams, ({ many }) => ({
  teamMembers: many(teamMembers),
  activityLogs: many(activityLogs),
  invitations: many(invitations),
}));

export const usersRelations = relations(users, ({ many }) => ({
  teamMembers: many(teamMembers),
  invitationsSent: many(invitations),
}));

export const invitationsRelations = relations(invitations, ({ one }) => ({
  team: one(teams, {
    fields: [invitations.teamId],
    references: [teams.id],
  }),
  invitedBy: one(users, {
    fields: [invitations.invitedBy],
    references: [users.id],
  }),
}));

export const teamMembersRelations = relations(teamMembers, ({ one }) => ({
  user: one(users, {
    fields: [teamMembers.userId],
    references: [users.id],
  }),
  team: one(teams, {
    fields: [teamMembers.teamId],
    references: [teams.id],
  }),
}));

export const activityLogsRelations = relations(activityLogs, ({ one }) => ({
  team: one(teams, {
    fields: [activityLogs.teamId],
    references: [teams.id],
  }),
  user: one(users, {
    fields: [activityLogs.userId],
    references: [users.id],
  }),
}));

export const adminsRelations = relations(admins, ({ one }) => ({
  // Define any relations if needed
}));

export const appointmentsRelations = relations(appointments, ({ one }) => ({
  customer: one(customers, {
    fields: [appointments.customerId],
    references: [customers.id],
  }),
  provider: one(providers, {
    fields: [appointments.providerId],
    references: [providers.id],
  }),
  service: one(services, {
    fields: [appointments.serviceId],
    references: [services.id],
  }),
}));

export const availabilitiesRelations = relations(availabilities, ({ one }) => ({
  provider: one(providers, {
    fields: [availabilities.providerId],
    references: [providers.id],
  }),
  service: one(services, {
    fields: [availabilities.serviceId],
    references: [services.id],
  }),
}));

export const customersRelations = relations(customers, ({ many }) => ({
  appointments: many(appointments),
}));

export const providersRelations = relations(providers, ({ many }) => ({
  availabilities: many(availabilities),
  appointments: many(appointments),
  unavailabilities: many(unavailabilities),
}));

export const secretariesRelations = relations(secretaries, ({ many }) => ({
  // Define any relations if needed
}));

export const servicesCategoriesRelations = relations(servicesCategories, ({ many }) => ({
  services: many(services),
}));

export const servicesRelations = relations(services, ({ one, many }) => ({
  serviceCategory: one(servicesCategories, {
    fields: [services.serviceCategoryId],
    references: [servicesCategories.id],
  }),
}));

export const settingsRelations = relations(settings, ({ }) => ({
  // Define any relations if needed
}));

export const unavailabilitiesRelations = relations(unavailabilities, ({ one }) => ({
  provider: one(providers, {
    fields: [unavailabilities.providerId],
    references: [providers.id],
  }),
}));

// New Types
export type Admin = typeof admins.$inferSelect;
export type NewAdmin = typeof admins.$inferInsert;
export type Provider = typeof providers.$inferSelect;
export type NewProvider = typeof providers.$inferInsert;
export type Customer = typeof customers.$inferSelect;
export type NewCustomer = typeof customers.$inferInsert;
export type Secretary = typeof secretaries.$inferSelect;
export type NewSecretary = typeof secretaries.$inferInsert;
export type ServiceCategory = typeof servicesCategories.$inferSelect;
export type NewServiceCategory = typeof servicesCategories.$inferInsert;
export type Service = typeof services.$inferSelect;
export type NewService = typeof services.$inferInsert;
export type Appointment = typeof appointments.$inferSelect;
export type NewAppointment = typeof appointments.$inferInsert;
export type Availability = typeof availabilities.$inferSelect;
export type NewAvailability = typeof availabilities.$inferInsert;
export type Unavailability = typeof unavailabilities.$inferSelect;
export type NewUnavailability = typeof unavailabilities.$inferInsert;
export type Setting = typeof settings.$inferSelect;
export type NewSetting = typeof settings.$inferInsert;

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Team = typeof teams.$inferSelect;
export type NewTeam = typeof teams.$inferInsert;
export type TeamMember = typeof teamMembers.$inferSelect;
export type NewTeamMember = typeof teamMembers.$inferInsert;
export type ActivityLog = typeof activityLogs.$inferSelect;
export type NewActivityLog = typeof activityLogs.$inferInsert;
export type Invitation = typeof invitations.$inferSelect;
export type NewInvitation = typeof invitations.$inferInsert;
export type TeamDataWithMembers = Team & {
  teamMembers: (TeamMember & {
    user: Pick<User, 'id' | 'name' | 'email'>;
  })[];
};

export enum ActivityType {
  SIGN_UP = 'SIGN_UP',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
  UPDATE_PASSWORD = 'UPDATE_PASSWORD',
  DELETE_ACCOUNT = 'DELETE_ACCOUNT',
  UPDATE_ACCOUNT = 'UPDATE_ACCOUNT',
  CREATE_TEAM = 'CREATE_TEAM',
  REMOVE_TEAM_MEMBER = 'REMOVE_TEAM_MEMBER',
  INVITE_TEAM_MEMBER = 'INVITE_TEAM_MEMBER',
  ACCEPT_INVITATION = 'ACCEPT_INVITATION',
}
