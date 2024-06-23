export function Loading(props: any) {
  return (
    <>
      <div className="container my-[200px]">
        <div className="text-center">
          <h1 className="text-xl font-bold mb-2">Loading...</h1>
          <h4>{props?.message || "Sedang mangambil data"}</h4>
        </div>
      </div>
    </>
  );
}
