export interface UserI {
  id: string | null;
  email: string | null;
  name: string | null;
  token: string | null;
  ownedMeets: string[] | undefined;
}
