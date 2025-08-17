"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Clock, Star, Users, Mountain } from "lucide-react"

export default function HikingCoursesPage() {
  const [courses, setCourses] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [isGenerating, setIsGenerating] = useState(false)

  // Auto-generate courses every hour (100 courses with Asia bias)
  useEffect(() => {
    generateInitialCourses()
    const interval = setInterval(() => {
      generateCourses(100)
    }, 3600000) // 1 hour

    return () => clearInterval(interval)
  }, [])

  const generateInitialCourses = () => {
    generateCourses(20) // Start with 20 courses
  }

  const generateCourses = (count: number) => {
    setIsGenerating(true)
    const newCourses = []

    for (let i = 0; i < count; i++) {
      const course = generateRandomCourse()
      newCourses.push(course)
    }

    setCourses((prev) => [...prev, ...newCourses])
    setIsGenerating(false)
  }

  const generateRandomCourse = () => {
    // Asia-biased mountain generation (70% chance for Asian mountains)
    const isAsian = Math.random() < 0.7

    const asianMountains = [
      { name: "후지산", country: "일본", region: "아시아", difficulty: "중급", duration: "6-8시간", rating: 4.8 },
      { name: "한라산", country: "한국", region: "아시아", difficulty: "중급", duration: "5-7시간", rating: 4.7 },
      {
        name: "설악산 대청봉",
        country: "한국",
        region: "아시아",
        difficulty: "고급",
        duration: "8-10시간",
        rating: 4.9,
      },
      {
        name: "지리산 천왕봉",
        country: "한국",
        region: "아시아",
        difficulty: "중급",
        duration: "7-9시간",
        rating: 4.6,
      },
      {
        name: "에베레스트 베이스캠프",
        country: "네팔",
        region: "아시아",
        difficulty: "고급",
        duration: "12-14일",
        rating: 4.9,
      },
      {
        name: "안나푸르나 서킷",
        country: "네팔",
        region: "아시아",
        difficulty: "고급",
        duration: "15-20일",
        rating: 4.8,
      },
      {
        name: "킨타마니 바투르산",
        country: "인도네시아",
        region: "아시아",
        difficulty: "초급",
        duration: "2-3시간",
        rating: 4.5,
      },
      { name: "타이산", country: "중국", region: "아시아", difficulty: "중급", duration: "4-6시간", rating: 4.7 },
      { name: "황산", country: "중국", region: "아시아", difficulty: "중급", duration: "6-8시간", rating: 4.8 },
      {
        name: "알프스 몽블랑",
        country: "프랑스",
        region: "유럽",
        difficulty: "고급",
        duration: "10-12시간",
        rating: 4.9,
      },
    ]

    const otherMountains = [
      {
        name: "킬리만자로",
        country: "탄자니아",
        region: "아프리카",
        difficulty: "고급",
        duration: "5-7일",
        rating: 4.8,
      },
      { name: "마추픽추 트레킹", country: "페루", region: "남미", difficulty: "중급", duration: "4일", rating: 4.9 },
      { name: "그랜드캐년", country: "미국", region: "북미", difficulty: "중급", duration: "6-8시간", rating: 4.6 },
      {
        name: "요세미티 하프돔",
        country: "미국",
        region: "북미",
        difficulty: "고급",
        duration: "12-16시간",
        rating: 4.7,
      },
    ]

    const selectedMountains = isAsian ? asianMountains : otherMountains
    const mountain = selectedMountains[Math.floor(Math.random() * selectedMountains.length)]

    return {
      id: Date.now() + Math.random(),
      ...mountain,
      image: `/placeholder.svg?height=200&width=300&query=${mountain.name} mountain hiking trail`,
      participants: Math.floor(Math.random() * 500) + 50,
      price: Math.floor(Math.random() * 200) + 50,
    }
  }

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.country.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRegion = selectedRegion === "all" || course.region === selectedRegion
    const matchesDifficulty = selectedDifficulty === "all" || course.difficulty === selectedDifficulty

    return matchesSearch && matchesRegion && matchesDifficulty
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mountain className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold">세계 하이킹 코스</h1>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary">총 {courses.length}개 코스</Badge>
              {isGenerating && <Badge variant="outline">코스 생성 중...</Badge>}
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filters */}
      <section className="container mx-auto px-4 py-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="코스명이나 국가로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="rounded-md border border-input bg-background px-3 py-2"
          >
            <option value="all">모든 지역</option>
            <option value="아시아">아시아</option>
            <option value="유럽">유럽</option>
            <option value="북미">북미</option>
            <option value="남미">남미</option>
            <option value="아프리카">아프리카</option>
          </select>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="rounded-md border border-input bg-background px-3 py-2"
          >
            <option value="all">모든 난이도</option>
            <option value="초급">초급</option>
            <option value="중급">중급</option>
            <option value="고급">고급</option>
          </select>

          <Button onClick={() => generateCourses(10)} variant="outline">
            코스 추가 생성
          </Button>
        </div>
      </section>

      {/* Course Grid */}
      <section className="container mx-auto px-4 pb-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img
                  src={course.image || "/placeholder.svg"}
                  alt={course.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{course.name}</CardTitle>
                  <Badge
                    variant={
                      course.difficulty === "초급"
                        ? "secondary"
                        : course.difficulty === "중급"
                          ? "default"
                          : "destructive"
                    }
                  >
                    {course.difficulty}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {course.country} • {course.region}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {course.rating}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {course.participants}명 참여
                    </div>
                    <div className="text-lg font-semibold">${course.price}</div>
                  </div>

                  <Button className="w-full">코스 상세보기</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">검색 조건에 맞는 코스가 없습니다.</p>
          </div>
        )}
      </section>
    </div>
  )
}
