import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

export interface PrepIQOrganization {
  orgId: string;
  orgSlug: string;
  orgRole: string;
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      organizations: PrepIQOrganization[];
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: string;
    organizations: PrepIQOrganization[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string;
    organizations: PrepIQOrganization[];
  }
}
