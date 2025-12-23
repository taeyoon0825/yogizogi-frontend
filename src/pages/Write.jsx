import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, ImageIcon, Trash2, Save } from "lucide-react";

const notoSansKR = "Noto Sans KR";

export default function WritePage() {
  // 폼 상태
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [content, setContent] = useState("");
  const [allowComments, setAllowComments] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!title || !content || !location) {
      setError("제목, 여행지, 내용을 모두 입력해주세요.");
      return;
    }

    setError("");
    setSubmitting(true);

    // 날짜 파싱 (예: "2025.01.01 - 2025.01.05")
    let start_date = undefined;
    let end_date = undefined;
    if (dateRange.includes("-")) {
      const [startRaw, endRaw] = dateRange.split("-").map((s) => s.trim());
      const normalize = (s) => s.replace(/\./g, "-");
      if (startRaw) start_date = normalize(startRaw);
      if (endRaw) end_date = normalize(endRaw);
    }

    // 태그 문자열을 배열로 파싱
    const tags =
      tagsInput
        .split(/[\s,]+/)
        .map((t) => t.replace(/^#/, "").trim())
        .filter(Boolean) || [];

    const body = {
      author_id: 1, // TODO: 인증 붙이면 실제 로그인 유저 ID 사용
      title,
      content,
      region: location,
      start_date,
      end_date,
      tags,
    };

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const json = await res.json();
      if (!json.success) {
        throw new Error(json.message || "게시글 작성에 실패했습니다.");
      }

      const newPost = json.data;
      if (newPost && newPost.id) {
        navigate(`/post/${newPost.id}`);
      } else {
        navigate("/");
      }
    } catch (e) {
      console.error(e);
      setError(e.message || "알 수 없는 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  // 백엔드 필드(게시글 작성): title, region(location), start_date/end_date, tags, content
  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link to="/">
              <div className="flex items-center gap-3 cursor-pointer hover:opacity-70 transition-opacity">
                <img
                  src="/logo.png"
                  alt="여기저기"
                  className="w-10 h-10 rounded-lg flex-shrink-0"
                />
                <span
                  className="text-xl font-[900] text-foreground hidden sm:inline"
                  style={{
                    fontFamily: notoSansKR,
                    transform: "translate(-7px, 1.5px)",
                  }}
                >
                  여기저기
                </span>
              </div>
            </Link>

            {/* 우측 버튼 */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Link to="/profile">
                <Button variant="ghost">취소</Button>
              </Link>
              <Button
                className="bg-primary hover:bg-primary/90 gap-2"
                onClick={handleSubmit}
                disabled={submitting}
              >
                <Save className="w-4 h-4" />
                {submitting ? "발행 중..." : "발행하기"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* 제목 */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="여행기의 제목을 입력하세요"
            className="w-full text-4xl font-bold text-foreground placeholder-muted-foreground/50 bg-transparent focus:outline-none border-b-2 border-transparent hover:border-border focus:border-primary pb-4 transition-colors"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* 썸네일 이미지 */}
        <div className="mb-8">
          <div className="relative h-64 rounded-lg bg-secondary/50 border-2 border-dashed border-border flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-secondary/70 transition-colors group">
            <ImageIcon className="w-12 h-12 text-muted-foreground group-hover:text-primary transition-colors" />
            <div className="text-center">
              <p className="font-medium text-foreground mb-1">
                썸네일 이미지를 선택하세요
              </p>
              <p className="text-sm text-muted-foreground">
                클릭하거나 드래그해서 업로드
              </p>
            </div>
          </div>
        </div>

        {/* 여행 정보 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-border">
          {/* 위치 */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              여행지
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="예: 서울, 한국"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          {/* 여행 기간 */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              여행 기간
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="2025.01.01 - 2025.01.05"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* 태그 */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-foreground mb-2">
            태그
          </label>
          <input
            type="text"
            placeholder="#여행 #서울 #카페 (쉼표 또는 스페이스로 구분)"
            className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
          />
          <p className="text-xs text-muted-foreground mt-2">
            태그로 여행기를 더 쉽게 찾을 수 있습니다
          </p>
        </div>

        {/* 본문 */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-foreground mb-2">
            여행기 내용
          </label>
          <textarea
            placeholder="당신의 여행 이야기를 자유롭게 작성해주세요..."
            className="w-full px-4 py-4 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            rows={12}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <p className="text-xs text-muted-foreground mt-2">
            마크다운 형식을 지원합니다
          </p>
        </div>

        {/* 이미지 갤러리 */}
        <div className="mb-8 pb-8 border-b border-border">
          <label className="block text-sm font-medium text-foreground mb-4">
            여행 사진
          </label>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="relative aspect-square rounded-lg bg-secondary/50 border-2 border-dashed border-border flex items-center justify-center group cursor-pointer hover:bg-secondary transition-colors"
              >
                <ImageIcon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            ))}
          </div>
        </div>

        {/* 설정 */}
        <div className="mb-8 pb-8 border-b border-border space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">댓글 허용</p>
              <p className="text-sm text-muted-foreground">
                독자들의 댓글을 받을 수 있습니다
              </p>
            </div>
            <input
              type="checkbox"
              className="w-5 h-5 rounded"
              checked={allowComments}
              onChange={(e) => setAllowComments(e.target.checked)}
            />
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="flex gap-4 justify-end">
          <Link to="/profile">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Trash2 className="w-4 h-4" />
              취소
            </Button>
          </Link>
          <Button
            className="bg-primary hover:bg-primary/90 gap-2"
            onClick={handleSubmit}
            disabled={submitting}
          >
            <Save className="w-4 h-4" />
            {submitting ? "발행 중..." : "발행하기"}
          </Button>
        </div>

        {error && (
          <p className="mt-4 text-sm text-destructive text-right">{error}</p>
        )}
      </main>
    </div>
  );
}
