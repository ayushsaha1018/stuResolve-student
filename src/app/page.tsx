import { auth } from "@/lib/auth";

export default function Home() {
  const session = auth();
  console.log(session);

  return (
    <div className="flex flex-col">
      <h1>Hiii {JSON.stringify(session)}</h1>
    </div>
  );
}
