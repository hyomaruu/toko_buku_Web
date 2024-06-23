"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <>
      <div className="container my-[200px]">
        <div className="text-center">
          <h1 className="text-xl font-bold mb-2">Error {error?.name}</h1>
          <h4>{error?.message || "Alamat url tidak ditemukan"}</h4>
        </div>
      </div>
    </>
  );
}
