"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Clock, Star, Users, Mountain, X, Heart, Share2, Calendar } from "lucide-react"

export default function HikingCoursesPage() {
  const [courses, setCourses] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<any>(null)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [showSuccessMessage, setShowSuccessMessage] = useState("")

  useEffect(() => {
    console.log("[v0] Generating initial courses on page load")
    generateInitialCourses()
    const interval = setInterval(() => {
      generateCourses(100)
    }, 3600000) // 1 hour

    return () => clearInterval(interval)
  }, []) // Empty dependency array ensures this runs on every mount

  const generateInitialCourses = () => {
    setCourses([])
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
      {
        name: "후지산",
        country: "일본",
        region: "아시아",
        difficulty: "중급",
        duration: "6-8시간",
        rating: 4.8,
        description: "일본의 상징적인 산으로 아름다운 일출을 볼 수 있습니다.",
      },
      {
        name: "한라산",
        country: "한국",
        region: "아시아",
        difficulty: "중급",
        duration: "5-7시간",
        rating: 4.7,
        description: "제주도의 최고봉으로 사계절 다른 매력을 선사합니다.",
      },
      {
        name: "설악산 대청봉",
        country: "한국",
        region: "아시아",
        difficulty: "고급",
        duration: "8-10시간",
        rating: 4.9,
        description: "한국의 대표적인 명산으로 웅장한 암벽과 계곡이 장관입니다.",
      },
      {
        name: "지리산 천왕봉",
        country: "한국",
        region: "아시아",
        difficulty: "중급",
        duration: "7-9시간",
        rating: 4.6,
        description: "한국 최대의 국립공원으로 다양한 동식물을 관찰할 수 있습니다.",
      },
      {
        name: "에베레스트 베이스캠프",
        country: "네팔",
        region: "아시아",
        difficulty: "고급",
        duration: "12-14일",
        rating: 4.9,
        description: "세계 최고봉 에베레스트의 베이스캠프까지 가는 도전적인 트레킹입니다.",
      },
      {
        name: "안나푸르나 서킷",
        country: "네팔",
        region: "아시아",
        difficulty: "고급",
        duration: "15-20일",
        rating: 4.8,
        description: "히말라야의 아름다운 풍경을 만끽할 수 있는 클래식 트레킹 코스입니다.",
      },
      {
        name: "킨타마니 바투르산",
        country: "인도네시아",
        region: "아시아",
        difficulty: "초급",
        duration: "2-3시간",
        rating: 4.5,
        description: "발리의 활화산으로 일출 트레킹으로 유명합니다.",
      },
      {
        name: "타이산",
        country: "중국",
        region: "아시아",
        difficulty: "중급",
        duration: "4-6시간",
        rating: 4.7,
        description: "중국의 오악 중 하나로 역사적 의미가 깊은 성산입니다.",
      },
      {
        name: "황산",
        country: "중국",
        region: "아시아",
        difficulty: "중급",
        duration: "6-8시간",
        rating: 4.8,
        description: "기암괴석과 운해로 유명한 중국의 명산입니다.",
      },
      {
        name: "백두산",
        country: "중국/북한",
        region: "아시아",
        difficulty: "중급",
        duration: "5-7시간",
        rating: 4.6,
        description: "한민족의 영산으로 천지 호수가 아름답습니다.",
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
        description: "아프리카 최고봉으로 적도 근처의 만년설을 볼 수 있습니다.",
      },
      {
        name: "마추픽추 트레킹",
        country: "페루",
        region: "남미",
        difficulty: "중급",
        duration: "4일",
        rating: 4.9,
        description: "잉카 문명의 신비로운 유적지로 가는 트레킹입니다.",
      },
      {
        name: "그랜드캐년",
        country: "미국",
        region: "북미",
        difficulty: "중급",
        duration: "6-8시간",
        rating: 4.6,
        description: "미국의 대표적인 자연 경관으로 웅장한 협곡을 감상할 수 있습니다.",
      },
      {
        name: "요세미티 하프돔",
        country: "미국",
        region: "북미",
        difficulty: "고급",
        duration: "12-16시간",
        rating: 4.7,
        description: "요세미티 국립공원의 상징적인 바위산입니다.",
      },
      {
        name: "알프스 몽블랑",
        country: "프랑스",
        region: "유럽",
        difficulty: "고급",
        duration: "10-12시간",
        rating: 4.9,
        description: "유럽 최고봉으로 알프스의 아름다운 풍경을 만끽할 수 있습니다.",
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

  const toggleFavorite = (courseId: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(courseId)) {
      newFavorites.delete(courseId)
      showMessage("즐겨찾기에서 제거되었습니다")
    } else {
      newFavorites.add(courseId)
      showMessage("즐겨찾기에 추가되었습니다")
    }
    setFavorites(newFavorites)
  }

  const shareCourse = (course: any) => {
    if (navigator.share) {
      navigator.share({
        title: course.name,
        text: `${course.name} - ${course.country}의 멋진 하이킹 코스를 확인해보세요!`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(`${course.name} - ${window.location.href}`)
      showMessage("링크가 클립보드에 복사되었습니다")
    }
  }

  const bookCourse = (course: any) => {
    showMessage(`${course.name} 예약이 완료되었습니다!`)
    console.log("[v0] Course booked:", course.name)
  }

  const showMessage = (message: string) => {
    setShowSuccessMessage(message)
    setTimeout(() => setShowSuccessMessage(""), 3000)
  }

  const refreshCourses = () => {
    console.log("[v0] Refreshing courses manually")
    generateInitialCourses()
    showMessage("새로운 코스를 불러왔습니다!")
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
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
          {showSuccessMessage}
        </div>
      )}

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
              <Badge variant="outline">즐겨찾기 {favorites.size}개</Badge>
              {isGenerating && <Badge variant="outline">코스 생성 중...</Badge>}
              <Button onClick={refreshCourses} variant="outline" size="sm">
                새로고침
              </Button>
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
              <div className="aspect-video overflow-hidden relative">
                <img
                  src={course.image || "/placeholder.svg"}
                  alt={course.name}
                  className="h-full w-full object-cover"
                />
                <button
                  onClick={() => toggleFavorite(course.id)}
                  className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                >
                  <Heart
                    className={`h-4 w-4 ${favorites.has(course.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                  />
                </button>
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

                  <div className="flex gap-2">
                    <Button className="flex-1" onClick={() => setSelectedCourse(course)}>
                      상세보기
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => shareCourse(course)}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
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

      {selectedCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">{selectedCourse.name}</h2>
                <Button variant="ghost" size="sm" onClick={() => setSelectedCourse(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="aspect-video mb-4 overflow-hidden rounded-lg">
                <img
                  src={selectedCourse.image || "/placeholder.svg"}
                  alt={selectedCourse.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Badge variant="outline">{selectedCourse.difficulty}</Badge>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {selectedCourse.country} • {selectedCourse.region}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {selectedCourse.rating}
                  </div>
                </div>

                <p className="text-muted-foreground">{selectedCourse.description}</p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>소요시간: {selectedCourse.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{selectedCourse.participants}명 참여</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-2xl font-bold">${selectedCourse.price}</div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => toggleFavorite(selectedCourse.id)}>
                      <Heart
                        className={`h-4 w-4 mr-2 ${favorites.has(selectedCourse.id) ? "fill-red-500 text-red-500" : ""}`}
                      />
                      {favorites.has(selectedCourse.id) ? "즐겨찾기 해제" : "즐겨찾기"}
                    </Button>
                    <Button onClick={() => bookCourse(selectedCourse)}>
                      <Calendar className="h-4 w-4 mr-2" />
                      예약하기
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
