"use client"

import * as React from "react"

import { Progress } from "@/components/ui/progress"
import { Questions } from "@prisma/client"

interface ProgressBarProps {
  questionsList: Questions,
}

export function ProgressBar({ questionsList }: ProgressBarProps) {
  const [progress, setProgress] = React.useState(70)

  // React.useEffect(() => {
  //   const timer = setTimeout(() => setProgress(66), 500)
  //   return () => clearTimeout(timer)
  // }, [])

  return <Progress value={progress} className="w-full" />
}

