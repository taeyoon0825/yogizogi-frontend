import { useEffect, useState } from "react";
import {
  Heart,
  MessageCircle,
  MapPin,
  Share2,
  ChevronLeft,
  Clock,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// 백엔드 필드(게시글 상세): post(id, title, author, authorAvatar, location, date, likes, comments, image, tags, content), commentsList(id, author, avatar, content, date, likes)
export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const detailRes = await fetch(`/api/posts/${id}`);
        if (detailRes.ok) {
          const data = await detailRes.json();
          setPost({
            id: data.id,
            title: data.title,
            author: data.author,
            authorAvatar: data.authorUrl,
            location: data.location,
            date: data.date,
            likes: data.likes ?? 0,
            comments: data.comments ?? (data.commentsList?.length || 0),
            image: data.images?.[0]?.url || data.image,
            tags: data.tags || [],
            content: data.content,
            commentsList: data.comments || data.commentsList || [],
          });
        } else {
          setPost(null);
        }

        const recRes = await fetch(`/api/posts?limit=2`);
        if (recRes.ok) {
          const recData = await recRes.json();
          const list = Array.isArray(recData) ? recData : recData.items || [];
          setRecommendations(list.filter((p) => String(p.id) !== String(id)).slice(0, 2));
        } else {
          setRecommendations([]);
        }
      } catch (err) {
        console.error("Failed to load post", err);
        setPost(null);
        setRecommendations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">
        게시글을 불러오는 중...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">
        게시글을 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 hover:opacity-70 transition-opacity"
            >
              <ChevronLeft className="w-6 h-6" />
              <span
                className="font-semibold"
                style={{
                  fontFamily: "Noto Sans KR Black",
                  transform: "translateY(3px)",
                }}
              >
                돌아가기
              </span>
            </Link>
            <div className="flex items-center gap-2">
              <Link to="/profile">
                <Button variant="ghost" size="sm">
                  프로필
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* 게시글 헤더 */}
        <article>
          {/* 메인 이미지 */}
          <div className="w-full h-96 rounded-xl overflow-hidden mb-8 bg-secondary">
            <img
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* 제목 및 기본 정보 */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">
              {post.title}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 pb-6 border-b border-border">
              {/* 작가 정보 */}
              <div className="flex items-center gap-3">
                <img
                  src={post.authorAvatar || "/placeholder.svg"}
                  alt={post.author}
                  className="w-12 h-12 rounded-full bg-secondary"
                />
                <div>
                  <p className="font-semibold text-foreground">{post.author}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.date}
                  </p>
                </div>
              </div>

              {/* 위치 정보 */}
              <div className="flex items-center gap-2 text-muted-foreground ml-auto">
                <MapPin className="w-5 h-5" />
                <span>{post.location}</span>
              </div>
            </div>

            {/* 태그 */}
            <div className="flex gap-2 flex-wrap mb-6">
              {(post.tags || []).map((tag, idx) => (
                <span
                  key={idx}
                  className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full hover:bg-primary/20 transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 본문 */}
          <div className="prose prose-sm max-w-none mb-8">
            <div className="text-foreground leading-relaxed whitespace-pre-line text-lg">
              {post.content}
            </div>
          </div>

          {/* 상호작용 버튼 */}
          <div className="border-y border-border py-6 mb-8">
            <div className="flex items-center gap-4">
              <Button className="flex items-center gap-2 bg-primary hover:bg-primary/90">
                <Heart className="w-5 h-5" />
                <span>{post.likes}</span>
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2 border-border bg-transparent"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{post.comments}</span>
              </Button>
              <Button variant="ghost" className="ml-auto">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* 댓글 섹션 */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              댓글 ({post.comments || (post.commentsList?.length ?? 0)})
            </h2>

            {/* 댓글 입력 */}
            <Card className="p-4 mb-6 border-border/50">
              <div className="flex gap-3">
                <img
                  src="/user-profile-avatar.png"
                  alt="프로필"
                  className="w-10 h-10 rounded-full bg-secondary"
                />
                <div className="flex-1">
                  <textarea
                    placeholder="댓글을 작성해주세요..."
                    className="w-full bg-secondary/50 text-foreground placeholder-muted-foreground rounded-lg px-4 py-3 border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    rows={3}
                  />
                  <div className="flex justify-end mt-2">
                    <Button className="bg-primary hover:bg-primary/90">
                      댓글 등록
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* 댓글 목록 */}
            <div className="space-y-4">
              {(post.commentsList || []).length > 0 ? (
                (post.commentsList || []).map((comment) => (
                  <Card key={comment.id} className="p-4 border-border/50">
                    <div className="flex gap-3">
                      <img
                        src={comment.avatar || "/placeholder.svg"}
                        alt={comment.author}
                        className="w-10 h-10 rounded-full bg-secondary"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold text-foreground">
                            {comment.author}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {comment.date}
                          </p>
                        </div>
                        <p className="text-foreground mb-2">
                          {comment.content}
                        </p>
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                            <Heart className="w-4 h-4" />
                            <span>{comment.likes}</span>
                          </button>
                          <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            답글달기
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">아직 댓글이 없어요.</p>
                  <p className="text-sm text-muted-foreground">
                    첫 댓글을 작성해보세요!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 추천 게시글 */}
          <div className="border-t border-border pt-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              다른 여행기
            </h2>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {recommendations.map((recPost) => (
                <Link key={recPost.id} to={`/post/${recPost.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group border-border/50 h-full">
                    <div className="relative h-40 overflow-hidden bg-secondary">
                      <img
                        src={recPost.image || "/placeholder.svg"}
                        alt={recPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-bold text-foreground line-clamp-2 mb-1 text-sm group-hover:text-primary transition-colors">
                        {recPost.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {recPost.author}
                      </p>
                    </div>
                  </Card>
                </Link>
              ))}
              {recommendations.length === 0 && (
                <Card className="p-4 border-border/50 text-muted-foreground">추천할 게시글이 없습니다.</Card>
              )}
            </div>
          </div>
        </article>
      </main>

      {/* 푸터 */}
      <footer className="border-t border-border bg-card mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-foreground mb-4">여기저기</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    소개
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    공지사항
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">기능</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    여행기 작성
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    여행 계획
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">정보</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    이용약관
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    개인정보
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">팔로우</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 여기저기. 모든 권리 보유.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
