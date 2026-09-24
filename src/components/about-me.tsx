import { getPostsCount } from "@/lib/get-posts";

async function AboutMe() {
  const total = await getPostsCount();
  return (
    <div>
      <p>
        👋 سلام! من <strong>همایون</strong> هستم
      </p>

      <p>
        💻 فرانت‌اند دولوپر با بیش از <strong>۴ سال</strong> تجربه
      </p>

      <p>
        🧭 کنجکاوی منو به حوزه‌های مختلف می‌بره و هر روز چیز جدیدی یاد می‌گیرم
      </p>

      <blockquote>یادگیری بی‌پایان، سفری برای کشف چیزهای تازه‌ست 🌱</blockquote>

      <p>
        📝 تا الان <strong>{total}</strong> پست اینجا نوشتم
      </p>
    </div>
  );
}

export default AboutMe;
