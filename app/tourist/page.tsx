"use client";

import { useEffect, useState } from "react";

import { Button, Card } from "@/components/ui";
import { TableCardFooter, TableContent as TableContentTourist, TableRowContent, buildNumber } from "@/components/index";
import { TouristTable } from "./_types";
import { TouristListResponse, getTouristList } from "@/api/tourist";
import { useRouter } from "next/navigation";

function createData(name: string, email: string, id: string, location: string): TouristTable {
  return { name, email, id, location };
}

export default function Page() {
  const [data, setData] = useState<TouristTable[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(10);
  const router = useRouter();
  const [current, setCurrent] = useState<number>(1);
  const [res, setRes] = useState<TouristListResponse>();
  const [totals, setTotals] = useState<any>(0);

  const getTourists = async () => {
    try {
      const res = await getTouristList(current);
      setRes(res);
    } catch (e: any) {
      if (e.response.status) {
        localStorage.clear();
        router.push("/");
      }
      throw e;
    }
  };
  useEffect(() => {
    getTourists();
  }, [refresh]);

  const headers: TableRowContent<TouristTable>[] = [
    {
      id: "name",
      text: "Name",
      value: "name"
    },

    {
      id: "email",
      text: "Email",
      value: "email"
    },
    {
      id: "location",
      text: "Locations",
      value: "location"
    }
  ];

  useEffect(() => {
    setData([]);
    res?.data?.forEach((data) => {
      setData((arr) => [...arr, createData(data?.tourist_name, data?.tourist_email, data?.id_tourist, data?.tourist_location)]);
    });
    setTotals(res?.total_pages);
  }, [res, refresh]);

  const renderOption = () => {
    return <Button>Detail</Button>;
  };
  const renderNumber = (_: any, idx: number) => {
    return buildNumber(idx, limit, current);
  };

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-2xl">Tourist List</h2>
      <div className="pt-4">
        <div className="flex flex-col gap-2">
          <Card className="mt-4">
            <TableContentTourist
              identityKey="id"
              numberOptions={{ render: renderNumber, text: "#", show: true }}
              actionOptions={{
                render: renderOption,
                text: "Actions",
                show: true
              }}
              data={data}
              headers={headers}
            />
            <TableCardFooter show={limit} current={current} setCurrent={setCurrent} totalPage={totals} refresh={refresh} setRefresh={setRefresh} />
          </Card>
        </div>
      </div>
    </div>
  );
}
