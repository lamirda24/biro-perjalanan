import { Card, CardContent } from "@/components/ui";
import React from "react";

interface UserDetail {
  user?: number;
  qty?: number;
  total?: number;
}
const UserDetail = (props: UserDetail) => {
  const { user, qty, total } = props;

  return (
    <Card>
      <CardContent className="p-4">
        <section className="grid grid-cols-2 grid-rows-2">
          <div className="flex flex-row gap-2 justify-between">
            <p>User: {user}</p>
            <p># of items: {qty} </p>
          </div>
          <div className="flex flex-row gap-2 justify-between">
            <p>Added on : 18/07/2023</p>
            <p>Total Amount: {total}</p>
          </div>
        </section>
      </CardContent>
    </Card>
  );
};

export default UserDetail;
