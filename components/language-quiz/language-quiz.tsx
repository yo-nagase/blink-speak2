'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Mic,
  Timer,
  ChevronRight,
  Volume2,
  X,
  CheckCircle2,
  XCircle,
  ChevronDown,
  History,
  Clock,
  CheckCircle,
  XOctagon
} from "lucide-react"
import { useState, useEffect } from "react"
import useQuestion from "./hooks/useQuestion"

type AnswerHistory = {
  id: number
  answer: string
  correct: boolean
  timestamp: Date
}

export function LanguageQuiz() {
  const [userAnswer, setUserAnswer] = useState("")
  const [timer, setTimer] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [results, setResults] = useState<{
    correct: boolean
    streak: number
    total: number
  }>({
    correct: false,
    streak: 3,
    total: 23
  })
  const [autoSubmit, setAutoSubmit] = useState(false)
  const { getNewQuestion, getCurrentQuestion, isQuestionLoading, error } = useQuestion()

  const [answerHistory, setAnswerHistory] = useState<AnswerHistory[]>([
    {
      id: 1,
      answer: "She goes to her company by bus everyday",
      correct: true,
      timestamp: new Date(2024, 9, 29, 14, 30)
    },
    {
      id: 2,
      answer: "She go to her company by bus everyday",
      correct: false,
      timestamp: new Date(2024, 9, 28, 15, 45)
    },
    {
      id: 3,
      answer: "She went to her company by bus everyday",
      correct: false,
      timestamp: new Date(2024, 9, 27, 16, 20)
    }
  ])

  const stats = {
    correct: answerHistory.filter(h => h.correct).length,
    incorrect: answerHistory.filter(h => !h.correct).length,
    percentage: Math.round((answerHistory.filter(h => h.correct).length / answerHistory.length) * 100) || 0
  }

  useEffect(() => {
    // const interval = setInterval(() => {
    //   setTimer(prev => prev + 1)
    // }, 1000)
    // return () => clearInterval(interval)


  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowResults(true)
    const isCorrect = Math.random() > 0.5
    setResults(prev => ({
      ...prev,
      correct: isCorrect
    }))

    setAnswerHistory(prev => [{
      id: prev.length + 1,
      answer: userAnswer,
      correct: isCorrect,
      timestamp: new Date()
    }, ...prev])
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  const formatTime = (seconds: number) => {
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`
  }

  return (
    <div className="py-8">
      <div className="container max-w-3xl mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium">Question 23 of 234</div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Timer className="h-4 w-4" />
              {formatTime(timer)}
            </div>
          </div>
          <Progress value={10} className="h-2" />
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="p-2 bg-white/50 dark:bg-black/50 backdrop-blur">
            <div className="text-xs text-muted-foreground">Streak</div>
            <div className="text-lg font-semibold">{results.streak}</div>
          </Card>
          <Card className="p-2 bg-white/50 dark:bg-black/50 backdrop-blur">
            <div className="text-xs text-muted-foreground">Correct</div>
            <div className="text-lg font-semibold">{results.total}/234</div>
          </Card>
          <Card className="p-2 bg-white/50 dark:bg-black/50 backdrop-blur">
            <div className="text-xs text-muted-foreground">Accuracy</div>
            <div className="text-lg font-semibold">
              {Math.round((results.total / 234) * 100)}%
            </div>
          </Card>
        </div>

        <Card className="mb-6">
          <div className="p-6">
            <div className="flex gap-2 mb-4">
              <Badge variant="secondary">Level 1</Badge>
              <Badge variant="secondary">Missed {'>'}10</Badge>
            </div>
            <TooltipProvider>
              <div className="flex gap-1 mb-4">
                {answerHistory.slice(0, 3).map((attempt, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger>
                      <div className={`w-4 h-1.5 rounded-full ${attempt.correct ? 'bg-green-500' : 'bg-red-500'}`} />
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="p-0">
                      <Card className="w-64">
                        <div className="p-3">
                          <h4 className="font-medium mb-2">{attempt.correct ? 'Correct' : 'Incorrect'}</h4>
                          <div className="text-sm space-y-1">
                            <p><span className="font-medium">Date:</span> {formatDate(attempt.timestamp)}</p>
                            <p><span className="font-medium">Answer:</span> {attempt.answer}</p>
                          </div>
                        </div>
                      </Card>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </TooltipProvider>
            <div className="text-sm text-muted-foreground mb-4">
              Correct answer rate for this question: 65%
            </div>
            <div className="flex justify-between items-start mb-6">
              <div className="text-xl font-medium">
                昨日は忙しかったので、映画を見に行けませんでした。<br />
              </div>
              <Button variant="ghost" size="icon" className="mt-1">
                <Volume2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center justify-end mb-4">
              <label htmlFor="auto-submit" className="text-sm mr-2">Auto-submit after voice input</label>
              <Switch
                id="auto-submit"
                checked={autoSubmit}
                onCheckedChange={setAutoSubmit}
              />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Input
                  className="pr-10"
                  placeholder="Type your answer..."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  autoFocus
                />
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => {
                    if (autoSubmit) {
                      handleSubmit(new Event('submit') as unknown as React.FormEvent)
                    }
                  }}
                >
                  <Mic className="h-4 w-4" />
                  <span className="sr-only">Voice input</span>
                </Button>
              </div>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
                >
                  Answer & Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>

          <div className="border-t">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">{stats.correct}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <XOctagon className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium">{stats.incorrect}</span>
                  </div>
                  <div className="flex items-center gap-1.5 border-l pl-4">
                    <span className="text-sm font-medium">{stats.percentage}%</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  {answerHistory.map((history, index) => (
                    <div
                      key={history.id}
                      className={`w-1.5 h-6 rounded-full ${history.correct ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      title={`Attempt ${answerHistory.length - index}: ${history.correct ? 'Correct' : 'Incorrect'
                        }`}
                    />
                  ))}
                </div>
              </div>

              <Button
                variant="ghost"
                className="w-full flex items-center justify-between hover:bg-gray-50"
                onClick={() => setShowHistory(!showHistory)}
              >
                <div className="flex items-center gap-2">
                  <History className="h-4 w-4" />
                  <span>Previous Attempts</span>
                  <Badge variant="secondary" className="ml-2">
                    {answerHistory.length}
                  </Badge>
                </div>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${showHistory ? 'rotate-180' : ''
                    }`}
                />
              </Button>
            </div>

            {showHistory && (
              <div className="border-t divide-y">
                {answerHistory.map((history) => (
                  <div key={history.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        {history.correct ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                        <span className={`text-sm ${history.correct ? 'text-green-600' : 'text-red-600'
                          }`}>
                          {history.correct ? 'Correct' : 'Incorrect'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {formatDate(history.timestamp)}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground pl-6">
                      {history.answer}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        {showResults && (
          <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-black border-t shadow-lg transform transition-transform duration-200 ease-in-out z-50">
            <div className="container max-w-3xl mx-auto">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {results.correct ? (
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-500" />
                    )}
                    <span className="font-medium">
                      {results.correct ? "Correct!" : "Incorrect"}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowResults(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-muted-foreground">Your answer</div>
                    <div className="text-sm">{userAnswer}</div>
                  </div>

                  <div>
                    <div className="text-xs text-muted-foreground">Correct answer</div>
                    <div className="text-sm">
                      She <span className="bg-green-100 px-1">goes</span> to her company by bus every day.
                    </div>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="text-xs font-medium mb-1">Tips</div>
                    <div className="text-sm text-muted-foreground">
                      主語が三人称単数形の場合は、goesを使いましょう。また、所有格の場合は her を使います。
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}