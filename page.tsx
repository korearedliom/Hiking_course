"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Star, MapPin, Clock, Mountain, Users, Search, Heart, Calendar, Camera, Award } from "lucide-react"

// 아시아 하이킹 코스 데이터
const hikingCourses = [
  {
    id: 1,
    title: "후지산 요시다 루트",
    country: "일본",
    location: "야마나시현",
    difficulty: "중급",
    distance_km: 14,
    duration_hours: 8,
    best_season: ["7월", "8월", "9월"],
    description:
      "일본의 상징인 후지산을 오르는 가장 인기 있는 코스입니다. 아름다운 일출과 구름 위의 경치를 감상할 수 있습니다.",
    image: "/fuji-cherry-blossom-trail.png",
    rating: 4.8,
    reviews: 1247,
    price: "무료",
    highlights: ["일출 명소", "구름바다", "신사 참배"],
  },
  {
    id: 2,
    title: "안나푸르나 베이스캠프",
    country: "네팔",
    location: "안나푸르나 지역",
    difficulty: "중급",
    distance_km: 130,
    duration_hours: 168,
    best_season: ["3월", "4월", "5월", "10월", "11월"],
    description: "히말라야의 웅장한 산맥을 감상할 수 있는 세계적으로 유명한 트레킹 코스입니다.",
    image: "/annapurna-base-camp.png",
    rating: 4.9,
    reviews: 892,
    price: "$800-1200",
    highlights: ["히말라야 전망", "다양한 문화", "고산 경험"],
  },
  {
    id: 3,
    title: "제주 올레길 7코스",
    country: "한국",
    location: "제주도",
    difficulty: "초급",
    distance_km: 14.7,
    duration_hours: 5,
    best_season: ["4월", "5월", "9월", "10월"],
    description: "제주의 아름다운 해안선과 오름을 따라 걷는 평화로운 코스입니다.",
    image: "/jeju-olle-coastal-path.png",
    rating: 4.6,
    reviews: 634,
    price: "무료",
    highlights: ["해안 절경", "오름 체험", "제주 문화"],
  },
  {
    id: 4,
    title: "타이거 네스트 사원",
    country: "부탄",
    location: "파로",
    difficulty: "중급",
    distance_km: 6,
    duration_hours: 4,
    best_season: ["3월", "4월", "5월", "10월", "11월"],
    description: "절벽에 매달린 신비로운 사원으로 향하는 영적인 하이킹 코스입니다.",
    image: "/tiger-nest-monastery-hike.png",
    rating: 4.7,
    reviews: 445,
    price: "$50",
    highlights: ["신비로운 사원", "절벽 경치", "영적 체험"],
  },
  {
    id: 5,
    title: "설악산 울산바위",
    country: "한국",
    location: "강원도",
    difficulty: "중급",
    distance_km: 8,
    duration_hours: 6,
    best_season: ["4월", "5월", "9월", "10월"],
    description: "거대한 바위산의 정상에서 설악산의 웅장한 경치를 감상할 수 있습니다.",
    image: "/seoraksan-ulsanbawi-autumn.png",
    rating: 4.5,
    reviews: 789,
    price: "₩3,500",
    highlights: ["바위 등반", "단풍 명소", "케이블카"],
  },
  {
    id: 6,
    title: "킨타마니 바투르산",
    country: "인도네시아",
    location: "발리",
    difficulty: "초급",
    distance_km: 5,
    duration_hours: 3,
    best_season: ["4월", "5월", "6월", "7월", "8월", "9월"],
    description: "활화산 정상에서 보는 일출과 칼데라 호수의 절경을 만날 수 있습니다.",
    image: "/mount-batur-sunrise.png",
    rating: 4.4,
    reviews: 1156,
    price: "$35",
    highlights: ["일출 트레킹", "화산 체험", "온천"],
  },
]

const popularDestinations = [
  { name: "일본", count: 45, image: "/japan-mountain-hiking-trail.png" },
  { name: "네팔", count: 32, image: "/placeholder-e146k.png" },
  { name: "한국", count: 28, image: "/korea-autumn-hike.png" },
  { name: "인도네시아", count: 24, image: "/indonesia-volcano-hiking.png" },
  { name: "부탄", count: 18, image: "/placeholder.svg?height=200&width=300" },
  { name: "대만", count: 22, image: "/placeholder.svg?height=200&width=300" },
]

export default function HikingWebsite() {
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState("all")
  const [countryFilter, setCountryFilter] = useState("all")
  const [favorites, setFavorites] = useState(new Set())
  const [activeTab, setActiveTab] = useState("courses")

  const filteredCourses = hikingCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDifficulty = difficultyFilter === "all" || course.difficulty === difficultyFilter
    const matchesCountry = countryFilter === "all" || course.country === countryFilter
    return matchesSearch && matchesDifficulty && matchesCountry
  })

  const toggleFavorite = (courseId) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(courseId)) {
      newFavorites.delete(courseId)
    } else {
      newFavorites.add(courseId)
    }
    setFavorites(newFavorites)
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "초급":
        return "bg-green-100 text-green-800"
      case "중급":
        return "bg-yellow-100 text-yellow-800"
      case "고급":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Mountain className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold text-gray-900">아시아 하이킹</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Button variant="ghost" onClick={() => setActiveTab("courses")}>
                코스
              </Button>
              <Button variant="ghost" onClick={() => setActiveTab("destinations")}>
                여행지
              </Button>
              <Button variant="ghost" onClick={() => setActiveTab("community")}>
                커뮤니티
              </Button>
              <Button variant="ghost" onClick={() => setActiveTab("mypage")}>
                마이페이지
              </Button>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                로그인
              </Button>
              <Button size="sm">회원가입</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">아시아의 숨겨진 하이킹 코스를 발견하세요</h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            초급부터 중급까지, 당신에게 완벽한 하이킹 코스를 찾아보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="코스명, 국가, 지역으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-gray-900"
              />
            </div>
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 h-12 px-8">
              검색하기
            </Button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="courses">하이킹 코스</TabsTrigger>
            <TabsTrigger value="destinations">인기 여행지</TabsTrigger>
            <TabsTrigger value="community">커뮤니티</TabsTrigger>
            <TabsTrigger value="mypage">마이페이지</TabsTrigger>
          </TabsList>

          <TabsContent value="courses">
            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-8 p-4 bg-white rounded-lg shadow-sm">
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="난이도" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">모든 난이도</SelectItem>
                  <SelectItem value="초급">초급</SelectItem>
                  <SelectItem value="중급">중급</SelectItem>
                  <SelectItem value="고급">고급</SelectItem>
                </SelectContent>
              </Select>

              <Select value={countryFilter} onValueChange={setCountryFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="국가" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">모든 국가</SelectItem>
                  <SelectItem value="일본">일본</SelectItem>
                  <SelectItem value="한국">한국</SelectItem>
                  <SelectItem value="네팔">네팔</SelectItem>
                  <SelectItem value="부탄">부탄</SelectItem>
                  <SelectItem value="인도네시아">인도네시아</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setDifficultyFilter("all")
                  setCountryFilter("all")
                }}
              >
                필터 초기화
              </Button>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                      onClick={() => toggleFavorite(course.id)}
                    >
                      <Heart
                        className={`h-4 w-4 ${favorites.has(course.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                      />
                    </Button>
                    <Badge className={`absolute top-2 left-2 ${getDifficultyColor(course.difficulty)}`}>
                      {course.difficulty}
                    </Badge>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <MapPin className="h-4 w-4" />
                          {course.country}, {course.location}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{course.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Mountain className="h-4 w-4" />
                        {course.distance_km}km
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {course.duration_hours}시간
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {course.reviews}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {course.highlights.map((highlight, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-green-600">{course.price}</span>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button onClick={() => setSelectedCourse(course)}>자세히 보기</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          {selectedCourse && (
                            <>
                              <DialogHeader>
                                <DialogTitle className="text-2xl">{selectedCourse.title}</DialogTitle>
                                <DialogDescription className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4" />
                                  {selectedCourse.country}, {selectedCourse.location}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <img
                                  src={selectedCourse.image || "/placeholder.svg"}
                                  alt={selectedCourse.title}
                                  className="w-full h-64 object-cover rounded-lg"
                                />
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                      <Mountain className="h-5 w-5 text-gray-600" />
                                      <span>거리: {selectedCourse.distance_km}km</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Clock className="h-5 w-5 text-gray-600" />
                                      <span>소요시간: {selectedCourse.duration_hours}시간</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Star className="h-5 w-5 text-yellow-400" />
                                      <span>
                                        평점: {selectedCourse.rating} ({selectedCourse.reviews}개 리뷰)
                                      </span>
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <Badge className={getDifficultyColor(selectedCourse.difficulty)}>
                                      {selectedCourse.difficulty}
                                    </Badge>
                                    <div>
                                      <span className="font-semibold">최적 시기:</span>
                                      <div className="flex flex-wrap gap-1 mt-1">
                                        {selectedCourse.best_season.map((season, index) => (
                                          <Badge key={index} variant="outline" className="text-xs">
                                            {season}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <p className="text-gray-700">{selectedCourse.description}</p>
                                <div>
                                  <h4 className="font-semibold mb-2">주요 특징</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {selectedCourse.highlights.map((highlight, index) => (
                                      <Badge key={index} variant="secondary">
                                        {highlight}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <div className="flex gap-2 pt-4">
                                  <Button className="flex-1">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    일정 계획하기
                                  </Button>
                                  <Button variant="outline" className="flex-1 bg-transparent">
                                    <Camera className="h-4 w-4 mr-2" />
                                    갤러리 보기
                                  </Button>
                                </div>
                              </div>
                            </>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="destinations">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularDestinations.map((destination, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="relative">
                    <img
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-end">
                      <div className="p-4 text-white">
                        <h3 className="text-xl font-bold">{destination.name}</h3>
                        <p className="text-sm opacity-90">{destination.count}개 코스</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="community">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>하이킹 커뮤니티</CardTitle>
                  <CardDescription>다른 하이커들과 경험을 나누고 정보를 공유하세요</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button className="w-full">새 글 작성하기</Button>
                    <div className="space-y-3">
                      {[
                        {
                          title: "후지산 등반 후기 - 일출이 정말 아름다웠어요!",
                          author: "하이커123",
                          time: "2시간 전",
                          replies: 12,
                        },
                        { title: "안나푸르나 트레킹 준비물 추천", author: "산악인", time: "5시간 전", replies: 8 },
                        { title: "제주 올레길 완주 인증!", author: "제주러버", time: "1일 전", replies: 24 },
                      ].map((post, index) => (
                        <Card key={index} className="p-4 hover:bg-gray-50 cursor-pointer">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{post.title}</h4>
                              <p className="text-sm text-gray-600">
                                {post.author} • {post.time}
                              </p>
                            </div>
                            <Badge variant="outline">{post.replies}개 댓글</Badge>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="mypage">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    찜한 코스
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-green-600">{favorites.size}개</p>
                  <p className="text-sm text-gray-600">관심 있는 코스들</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    완주한 코스
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-blue-600">3개</p>
                  <p className="text-sm text-gray-600">도전 완료!</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mountain className="h-5 w-5" />총 거리
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-orange-600">127km</p>
                  <p className="text-sm text-gray-600">누적 하이킹 거리</p>
                </CardContent>
              </Card>
            </div>
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>최근 활동</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { action: "후지산 요시다 루트를 찜했습니다", time: "2시간 전" },
                    { action: "제주 올레길 7코스 완주 인증", time: "3일 전" },
                    { action: "설악산 울산바위 후기 작성", time: "1주 전" },
                  ].map((activity, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span>{activity.action}</span>
                      <span className="text-sm text-gray-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Mountain className="h-6 w-6" />
                <span className="text-xl font-bold">아시아 하이킹</span>
              </div>
              <p className="text-gray-400">아시아 최고의 하이킹 코스를 발견하고 공유하는 플랫폼</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">서비스</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Button variant="link" className="p-0 h-auto text-gray-400">
                    코스 검색
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="p-0 h-auto text-gray-400">
                    추천 시스템
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="p-0 h-auto text-gray-400">
                    커뮤니티
                  </Button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">지원</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Button variant="link" className="p-0 h-auto text-gray-400">
                    고객센터
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="p-0 h-auto text-gray-400">
                    이용약관
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="p-0 h-auto text-gray-400">
                    개인정보처리방침
                  </Button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">연결</h3>
              <div className="flex space-x-4">
                <Button variant="outline" size="sm">
                  Facebook
                </Button>
                <Button variant="outline" size="sm">
                  Instagram
                </Button>
                <Button variant="outline" size="sm">
                  YouTube
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 아시아 하이킹. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
