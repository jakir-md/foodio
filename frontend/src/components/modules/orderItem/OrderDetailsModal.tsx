import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function OrderDetailsModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-medium px-4 py-1.5 rounded-md transition-colors">
          Details
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-112.5 p-6 bg-[#FAFAF9] gap-0">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-lg font-bold text-[#13322B] text-left">
            Order Details
          </DialogTitle>
          <p className="text-[#13322B] text-sm mt-1 text-left">
            #5b331ea1-49af-422e-ba46-4e94ca95294c
          </p>
        </DialogHeader>

        <div className="flex flex-col">
          <div>
            <p className="text-sm text-gray-700 mb-1.5">Address</p>
            <p className="text-sm text-gray-500">
              House:23, Road:23, Jamaica, USA
            </p>
          </div>

          <div className="h-px w-full bg-gray-200 my-5" />

          <div>
            <p className="text-sm text-gray-700 mb-4">Items</p>
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#13322B]">1x Pan-Seared Scallops</span>
              <span className="text-gray-500">$24.00</span>
            </div>
          </div>

          <div className="h-px w-full bg-gray-200 my-5" />

          <div className="flex justify-between items-center pb-2">
            <span className="text-base font-bold text-[#13322B]">Total</span>
            <span className="text-base font-bold text-[#13322B]">$24.00</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
