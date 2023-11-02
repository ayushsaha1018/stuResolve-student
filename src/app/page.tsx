import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const data = await getServerSession(authOptions);

  return (
    <div className="flex flex-col">
      <h1>Hiii {JSON.stringify(data)}</h1>
    </div>
  );
}
