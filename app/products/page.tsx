"use client";

import { ProductRequest, ProductResponse, fetchProduct } from "@/api";
import { useEffect, useMemo, useState } from "react";
import { ProductTable } from "./_types";

import { Button, Card, Input } from "@/components/ui";
import { TableCardFooter, TableCardHeader, TableContent as TableContentTest, TableRowContent, buildNumber } from "@/components/index";

function createData(id: number, productName: string, brand: string, stock: number, category: string, price: number): ProductTable {
  return { id, productName, brand, stock, category, price };
}

export default function Page() {
  const [data, setData] = useState<ProductTable[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(5);
  const [skip, setSkip] = useState<number>(0);
  const [keyword, setKeyword] = useState<string>("");
  const [current, setCurrent] = useState<number>(1);
  const [res, setRes] = useState<ProductResponse>();
  const [totals, setTotals] = useState<number>(0);
  let params: ProductRequest = {
    limit: limit,
    skip: skip,
    q: keyword,
  };

  const getProduct = async () => {
    try {
      const res = await fetchProduct(params);
      setRes(res);
      setTotals(Math.round(res?.total / res?.limit));
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getProduct();
  }, [refresh, keyword]);

  const headers: TableRowContent<ProductTable>[] = [
    {
      id: "productName",
      text: "Product Name",
      value: "productName",
    },
    {
      id: "brand",
      text: "Brand",
      value: "brand",
    },
    {
      id: "price",
      text: "Price",
      value: "price",
    },
    {
      id: "stock",
      text: "Stock",
      value: "stock",
    },
    {
      id: "category",
      text: "Category",
      value: "category",
    },
  ];

  useEffect(() => {
    setData([]);
    res?.products?.forEach((data) => {
      setData((arr) => [...arr, createData(data?.id, data?.title, data?.brand, data?.stock, data?.category, data?.price)]);
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
      <h2 className="font-bold text-2xl">Products</h2>
      <div className="pt-4">
        <main className="flex flex-col gap-2">
          <Card className="mt-4">
            <TableCardHeader input={<Input placeholder="Search..." name="search" onChange={(e) => setKeyword(e.target?.value)} />} />
            <TableContentTest
              identityKey="id"
              numberOptions={{ render: renderNumber, text: "#", show: true }}
              actionOptions={{
                render: renderOption,
                text: "Actions",
                show: true,
              }}
              data={data}
              headers={headers}
            />
            <TableCardFooter
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
