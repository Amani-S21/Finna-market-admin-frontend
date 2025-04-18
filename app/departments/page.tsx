import { Box, Card, Grid } from "@radix-ui/themes";
import React from "react";

const DepartmentsPage = () => {
  return (
    <div className="h-screen flex flex-col container mx-auto pb-16">
      <div className="py-8 flex gap-4 items-center justify-end">
        <div className="h-[60px] w-[60px] rounded-full bg-white border border-gray-300 flex justify-center items-center">
          <p>GE</p>
        </div>
      </div>
      <div className="flex justify-center items-center my-auto">
        <Grid
          gap="4"
          columns={{ initial: "1", md: "3" }}
          className="max-w-3xl my-auto"
        >
          <Card className="hover:cursor-pointer hover:bg-gray-300">
            <p>Super marché</p>
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem
              magni excepturi consectetur perferendis iusto odio. Voluptates
              aperiam facere, nihil porro ad at quidem rem quos nulla libero
              natus, odio dolore!
            </p>
          </Card>
          <Card className="hover:cursor-pointer hover:bg-gray-300">
            <p>Super marché</p>
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem
              magni excepturi consectetur perferendis iusto odio. Voluptates
              aperiam facere, nihil porro ad at quidem rem quos nulla libero
              natus, odio dolore!
            </p>
          </Card>
          <Card className="hover:cursor-pointer hover:bg-gray-300">
            <p>Super marché</p>
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem
              magni excepturi consectetur perferendis iusto odio. Voluptates
              aperiam facere, nihil porro ad at quidem rem quos nulla libero
              natus, odio dolore!
            </p>
          </Card>
        </Grid>
      </div>
    </div>
  );
};

export default DepartmentsPage;
