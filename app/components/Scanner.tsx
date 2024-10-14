"use client";
import { useState } from "react";
import { useZxing } from "react-zxing";
import { useMediaDevices } from "react-media-devices";
import useSound from "use-sound";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast"

const constraints: MediaStreamConstraints = {
  video: true,
  audio: false,
}

interface Props {
  onBarcodeScan: (result: string) => void;
}

export default function Scanner({ onBarcodeScan }: Props) {
  const { toast } = useToast()
  const [play] = useSound('/beep.mp3')
  const { devices } = useMediaDevices({ constraints });
  const [deviceId, setDeviceId] = useState(devices?.[0]?.deviceId);
  const [paused, setPause] = useState(false)
  const { ref } = useZxing({
    paused: !deviceId || paused,
    deviceId,
    onDecodeResult(result) {
      const result_arr = result.getText().split("\n",3)
      play()
      onBarcodeScan(result.getText())
      toast({
        title: 'Barcode Read',
        description: `Searching information from ${result_arr[1]}, ${result_arr[2]}...`
      })
      setPause(true)
    },
  });

  return (
    <>
      <Card className="flex flex-col gap-2 px-4 py-6">
        <CardTitle>Barcode Scanner</CardTitle>
        <CardDescription>This barcode scanner detects PDF417 codes imprinted to CTRL+ALT ELITE Officer IDs</CardDescription>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Select onValueChange={setDeviceId}>
              <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Camera" />
              </SelectTrigger>
              <SelectContent>
                  <SelectGroup>
                      <SelectLabel>Available Cameras</SelectLabel>
                        {devices?.map((device) => {
                            if(device.kind == "videoinput") {
                              return <SelectItem key={device.deviceId} value={device.deviceId}>{device.label}</SelectItem>
                            }
                        })}
                  </SelectGroup>
              </SelectContent>
          </Select>
          <Button variant="secondary" onClick={() => setPause(!paused)}>
            {paused ? 'Enable Camera' : 'Disable Camera'}
          </Button>
        </div>
        <CardContent className="w-full flex items-center justify-center">
          <video ref={ref} height={480} />
        </CardContent>
        <CardFooter>Please allow camera permissions to be able to use the scanner.</CardFooter>
      </Card>
    </>
  )
}