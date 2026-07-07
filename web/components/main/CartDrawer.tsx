import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useState } from "react";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CartDrawer = () => {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <Drawer
      direction="right"
      open={cartOpen}
      onOpenChange={setCartOpen}
      modal={true}
      dismissible={true}
    >
      <DrawerTrigger asChild>
        <Button className="rounded-full h-14 w-14 bg-[#F4F4F5] hover:bg-[#f4f4f55f] text-foreground cursor-pointer">
          <ShoppingCart color="black" />
        </Button>
      </DrawerTrigger>

      <DrawerContent style={{ width: 500, maxWidth: "85vw" }}>
        <DrawerHeader>
          <DrawerTitle className="flex gap-2 text-[18px]">
            <ShoppingCart color="black" /> Order detail
          </DrawerTitle>
        </DrawerHeader>

        <Tabs defaultValue="card">
          <div className="flex flex-col gap-5">
            <TabsList className="w-100 ">
              <TabsTrigger value="card" className="text-[18px]">
                Card
              </TabsTrigger>
              <TabsTrigger value="order" className="text-[18px]">
                Order
              </TabsTrigger>
            </TabsList>
            <TabsContent value="card">
              <Card className="h-120">
                <CardHeader>
                  <CardTitle>My card</CardTitle>
                  <CardDescription>
                    View your key metrics and recent project activity. Track
                    progress across all your active projects.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  You have 12 active projects and 3 pending tasks.
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="card">
              <Card className="h-60">
                <CardHeader>
                  <CardTitle>Payment info</CardTitle>
                  <CardDescription>
                    View your key metrics and recent project activity. Track
                    progress across all your active projects.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  You have 12 active projects and 3 pending tasks.
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="order">
              <Card className="h-180">
                <CardHeader>
                  <CardTitle>Order</CardTitle>
                  <CardDescription>
                    Track performance and user engagement metrics. Monitor
                    trends and identify growth opportunities.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Page views are up 25% compared to last month.
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button>Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
