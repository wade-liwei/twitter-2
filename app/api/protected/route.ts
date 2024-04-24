import { auth } from "auth"

export const GET = auth((req) => {
  if (req.auth) {
    return Response.json({ data: "Protected data 123456",user: req.auth.user,req:req})
  }

  return Response.json({ message: "Not authenticated 123456" }, { status: 401 })
}) as any // TODO: Fix `auth()` return type
