import { IEbursa } from "@assignment/libs/controllers/ebursa/models/ebursa";

export function Card({ ebursa }: { ebursa: IEbursa }) {
  return (
    <div className="rounded-lg border border-grey-200 hover:border-primary p-4 cursor-pointer">
      <h1 className="font-semibold text-lg hover:text-primary text-grey-700 mb-2">
        {ebursa?.title}
      </h1>
      <div
        dangerouslySetInnerHTML={{ __html: ebursa?.description || "" }}
      ></div>
    </div>
  );
}
