"use client";

import { CartData, ProductRequest, fetchCartDetail } from "@/api";
import { useEffect, useState } from "react";

import { Button, Card, Input } from "@/components/ui";
import { TableCardFooter, TableCardHeader, TableContent as TableContentTest, TableRowContent, buildNumber } from "@/components/index";
import { ProductTable } from "../products/_types";
import { CartDetailTable } from "./_types";
import UserDetail from "@/api/carts/_components/_user";

function createData(
  id: number,
  discountPercentage: number,
  discountedPrice: number,
  quantity: number,
  title: string,
  price: number,
  total: number
): CartDetailTable {
  return { id, discountPercentage, discountedPrice, quantity, title, price, total };
}

export default function Page() {
  const [data, setData] = useState<CartDetailTable[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(5);
  const [skip, setSkip] = useState<number>(0);
  const [keyword, setKeyword] = useState<string>("");
  const [current, setCurrent] = useState<number>(1);
  const [res, setRes] = useState<CartData>();
  const [totals, setTotals] = useState<number>(0);
  let params: ProductRequest = {
    limit: limit,
    skip: skip,
    q: keyword,
  };

  const getProduct = async () => {
    try {
      const res = await fetchCartDetail(current);
      setRes(res);

      // setTotals(Math.round(res?.total / res?.limit));
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getProduct();
  }, [refresh, keyword]);

  const headers: TableRowContent<CartDetailTable>[] = [
    {
      id: "productName",
      text: "Product Name",
      value: "title",
    },
    {
      id: "quantity",
      text: "Quantity",
      value: "quantity",
    },
    {
      id: "price",
      text: "Price",
      value: "price",
    },
    {
      id: "subtotal",
      text: "Sub Total",
      value: "total",
    },
    {
      id: "discountPercentage",
      text: "Discount",
      value: "discountPercentage",
    },
    {
      id: "total",
      text: "Total",
      value: "discountedPrice",
    },
  ];

  useEffect(() => {
    setData([]);
    res?.products?.forEach((data) => {
      setData((arr) => [
        ...arr,
        createData(Number(data?.id), data?.discountPercentage, data?.discountedPrice, data?.quantity, data?.title, data?.price, data?.total),
      ]);
    });
  }, [res, refresh]);

  const renderOption = () => {
    return <Button>Detail</Button>;
  };
  const renderNumber = (_: any, idx: number) => {
    return buildNumber(idx, limit, current);
  };

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-2xl">Cart - {current}</h2>
      <div className="pt-4">
        Details
        <UserDetail user={res?.id} total={res?.total} qty={res?.totalQuantity} />
        <main className="flex flex-col gap-2">
          <Card className="mt-4">
            <TableCardHeader input={<Input placeholder="Search..." name="search" onChange={(e) => setKeyword(e.target?.value)} />} />
            <TableContentTest
              identityKey="id"
              numberOptions={{ render: renderNumber, text: "#", show: true }}
              actionOptions={{
                render: renderOption,
                text: "Actions",
                show: false,
              }}
              data={data}
              headers={headers}
            />
            <TableCardFooter
              cart={true}
              show={limit}
              current={current}
              setCurrent={setCurrent}
              totalPage={totals}
              setPageChange={setSkip}
              refresh={refresh}
              setRefresh={setRefresh}
              skip={skip}
            />
          </Card>
        </main>
      </div>
    </div>
  );
}
