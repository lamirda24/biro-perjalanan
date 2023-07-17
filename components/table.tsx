"use client";

import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { Button, CardContent, CardFooter, CardHeader, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui";
import { skip } from "node:test";

export interface TableHeaderProps {
  text?: string;
  input?: React.ReactElement;
  action?: React.ReactElement;
}

export interface TableActionsProps<T = any> {
  show?: boolean;
  text: string;
  render: (row: T, idx: number) => React.ReactElement;
}
export const TableCardHeader = (props: TableHeaderProps) => {
  return (
    <CardHeader className="flex flex-row items-center justify-between">
      <h2 className="flex-1 text-xl font-semibold">{props?.text}</h2>
      <div className="flex w-[60%] flex-row items-center justify-end gap-2">
        <div className="w-[40%]">{props?.input}</div>
        <>{props?.action}</>
      </div>
    </CardHeader>
  );
};
interface TableNumbering<T = any> {
  // show number column when value is true
  show?: boolean;
  text: string;
  render: (row: T, idx: number) => React.ReactElement | number;
}

interface TableContentProps<T = any> {
  identityKey: keyof T;
  headers?: TableRowContent<T>[];
  data?: T[];
  actionOptions?: TableActionsProps<T>;
  numberOptions?: TableNumbering<T>;
  onHeaderClick?: (name: string) => void;
  onClickRow?: (row: T, idx: number) => void;
}

enum TableSortEnum {
  notSet = "",
  asc = "asc",
  desc = "desc",
}
export interface TableRowContent<T = any> {
  id: string;
  text: string;
  sort?: TableSortEnum;
  value: keyof T | ((row: T, index: number) => string | React.ReactElement);
}

export const TableContent = (props: TableContentProps) => {
  const isShowNumber = typeof props?.numberOptions?.show == "boolean" && props?.numberOptions?.show;

  const isShowAction = typeof props?.actionOptions?.show == "boolean" && props?.actionOptions?.show;

  return (
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            {isShowNumber && <TableHead>{props?.numberOptions?.text}</TableHead>}
            {props?.headers?.map((header) => (
              <TableHead
                onClick={() => console.log(header?.id)}
                className="cursor-pointer"
                key={`${header.text}-${header.text}-${header.sort || ""}`}
              >
                {header?.text}
              </TableHead>
            ))}

            {isShowAction && <TableHead className="w-[50px] text-center">{props?.actionOptions?.text}</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {props?.data?.map((row, rowNumber: number) => (
            <TableRow key={`${row[props.identityKey]}-${rowNumber}`}>
              {isShowNumber && (
                <TableCell key={`${props?.numberOptions?.text}-${row[props.identityKey]}`}>{props?.numberOptions?.render(row, rowNumber)}</TableCell>
              )}
              {props?.headers?.map((header) => (
                <TableCell
                  color="grayScale.80"
                  key={`${header.text}-${row[props.identityKey]}`}
                  // onClick={() =>
                  //   props.onClickRow && props.onClickRow(row, rowNumber)
                  // }
                >
                  {typeof header.value == "function" ? header.value(row, rowNumber) : row[header.value]}
                </TableCell>
              ))}
              {isShowAction && (
                <TableCell key={`${props?.actionOptions?.text}-${row[props.identityKey]}`} className="">
                  {props?.actionOptions?.render(row, rowNumber)}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  );
};

interface TableCardFooter {
  current: number;
  totalPage: number;
  // showItems?: number[]
  show: number;
  refresh?: boolean;
  skip: number;
  onShowChange?: (value: string) => void;
  setPageChange?: (value: number) => void;
  setRefresh?: (value: boolean) => void;
  setCurrent?: (value: number) => void;
  cart?: boolean;
}
export const TableCardFooter = (props: TableCardFooter) => {
  const { setPageChange, setCurrent, setRefresh, refresh, cart }: TableCardFooter = props;

  const handleChangePage = (type: string) => {
    switch (type) {
      case "next":
        if (cart) {
          setCurrent?.(props?.current + 1);
        } else {
          if (props?.current > 0) {
            setPageChange?.(props?.skip + +props?.show);
            setCurrent?.(props?.current + 1);
          }
        }
        setRefresh?.(!refresh);
        break;
      default:
        if (props.current == 1) return false;
        if (cart) {
          setCurrent?.(props?.current - 1);
        }
        if (props?.current <= props?.totalPage) {
          setPageChange?.(props?.skip - +props?.show);
          setCurrent?.(props?.current - 1);
          setRefresh?.(!refresh);
        }
        setRefresh?.(!refresh);
        break;
    }
  };
  return (
    <CardFooter className="flex w-full justify-end text-sm">
      <div className="flex flex-row items-center gap-4">
        <p>
          {props?.current} - {props?.totalPage} of {props?.totalPage} entries
        </p>
        <div className="flex flex-row items-center gap-2">
          <Button onClick={() => handleChangePage("back")}>
            <DoubleArrowLeftIcon />
          </Button>
          <Button onClick={() => handleChangePage("next")}>
            <DoubleArrowRightIcon />
          </Button>
        </div>
      </div>
    </CardFooter>
  );
};

export const buildNumber = (
  // Assume start with index 0
  idx: number,
  perPage: number,
  currentPage: number
) => {
  return (currentPage - 1) * perPage + idx + 1;
};
