import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog"
import {
    Alert,
    AlertTitle,
    AlertDescription
} from "@/components/ui/alert"

import { Document, WithId } from "mongodb"

interface Props {
    open: boolean,
    onOpenChange: ((open: boolean) => void) | undefined,
    data: WithId<Document> | undefined
}

export default function Information(prop: Props) {
    return (
        <Dialog open={prop.open} onOpenChange={prop.onOpenChange}>
            <DialogContent>
            <DialogTitle>Officer Dossier</DialogTitle>
            <DialogDescription>Information for Club Officer {prop.data?.name[2]}, {prop.data?.name[0]} {prop.data?.name[1]}</DialogDescription>
                <Alert>
                    <AlertTitle>Officer Verified</AlertTitle>
                    <AlertDescription>Compare information from the ID with the information below for further security.</AlertDescription>
                </Alert>
                <div className="grid grid-cols-2 grid-rows-1 gap-4">
                    <AspectRatio ratio={9/16}>
                        <Image alt={`A image of ${prop.data?.name[0]} ${prop.data?.name[2]}`} src={prop.data?.image} width={320} height={210} />
                    </AspectRatio>
                    <div className="grid grid-cols-2 grid-rows-3 gap-2 max-h-[75%]">
                        <div className="max-h-fit">
                            <span className="text-gray-400 text-sm">ID Number</span>
                            <p>{prop.data?.student_id}</p>
                        </div>
                        <div className="max-h-fit">
                            <span className="text-gray-400 text-sm">Valid Until</span>
                            <p>{prop.data?.expires_in.toDateString()}</p>
                        </div>
                        <div className="max-h-fit col-span-2">
                            <span className="text-gray-400 text-sm">Full Name</span>
                            <p className="font-bold">{prop.data?.name[2]}</p>
                            <p>{prop.data?.name[0]} {prop.data?.name[1]}</p>
                        </div>
                        <div className="max-h-fit">
                            <span className="text-gray-400 text-sm">Grade and Section</span>
                            <p>{prop.data?.grade_level}-{prop.data?.class_section}</p>
                        </div>
                        <div className="max-h-fit">
                            <span className="text-gray-400 text-sm">Position</span>
                            <p>{prop.data?.position}</p>
                        </div>
                    </div>
                </div>
            <DialogFooter className="w-full">
                <DialogClose asChild>
                    <Button>Scan another Barcode</Button>
                </DialogClose>
            </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}