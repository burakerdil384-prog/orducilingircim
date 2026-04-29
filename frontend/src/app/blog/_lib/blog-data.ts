import { prisma, isMockMode } from "@/lib/db";
import { mockPosts } from "@/lib/mock-data";

export const BLOG_PAGE_SIZE = 12;

export const categoryLabels: Record<string, { bg: string; text: string }> = {
  "Güvenlik": { bg: "bg-secondary", text: "text-white" },
  "Teknoloji": { bg: "bg-primary", text: "text-white" },
  "Acil Durum": { bg: "bg-primary", text: "text-white" },
  "Bakım": { bg: "bg-surface-container-highest", text: "text-primary" },
  "İş Yeri": { bg: "bg-secondary", text: "text-white" },
};

const blogImages: Record<number, string> = {
  1: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-XBJedgN0qvV8OiIeMwFG6CDLlWtjzNb780xjB3AzP3U92bcIC4jl0aJ_Y1Nk7uLJN8RiqrC25eCcY4_FXWrU4VG73lMZ1wObyGxtUFnvS6y-ZGT_OD7hlZXzBZybOr61CDytxxeIHYBdf54hwG-A3eRhS0OTcLWwV60JCrPje8uf6NUXWy6OndFPqS8zl4MgAqT0tpwSyEMiaJGhIhov-hwPd31-n1PIVUHZKLQmxK7d1CAx6v3r9Go9AUPVBcDQHZO_azk3gZ7u",
  2: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWlKcrFnvuN_hl7Mp5yPSpQ3XoXrFLhvjboQkFzkzDz3jJumLrUpmlRKf0SFh2R8fQOgioTdZj6FI9aQCMR-qlcKBbHvNb58b4VC-K86X05WPWesT4gOqxEuMRypmbtKcUoDUUMxUmwEf0K9icM--AjsKf9Q1zyzzw571Zr91_w5G_BUTuqbNEDv5hvxrFYRiHp3E9hxtPI93OeDmCpw6g3r2ommZQU6XXB0cS7kGZ51vY5fw7x5uaGlFSRSPTiYVYjgfbJUCBO68y",
  3: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYXZX9r_BxAMQE1ZN3vpiL7h0e8Z_VHU1niybLObNeAKw23rWhW1fELnbBbl2s9pMZc69vzfebkqgtIZQn2fygXZI-EaTkjeRNl0QsDCD60xfcqbng-4gusI722BGl6fVnDc_LiEsLmFwFRLtZvacQUmyLVwoWyr7MDuwhFyV845F2REblCpxNxM2lW20LN-w2TJtb1O5bEE8EQ8bEzTJJdmhXp55YN2IDCg7DDCo0H_qZAoveGE2AkMdvrhaYwm8D24exU8g2WYoJ",
  4: "https://lh3.googleusercontent.com/aida-public/AB6AXuDuskxzOYZZGbsQ6k0R9huumU2LvjJ1E7WiE1XO91V1G511VxU19N0GzslnqMl-1eWX9vyJdnNUiWsydHyjIfrIRDcWCng4k3YP5HTxRukT5HKD93pwsNNvIv-Z5sZfvk8NlGoJoHmV5Lwus5eoKNkmS0o6UwcabWD45bqfNw87RLinFmpjJjTPlyxhMoZMibmT4CgTL5d6_9OD9N5VySwxODFET_ZdXs9HzDjrlEc16SxR_qBYF0dSrFoKsqXbAHwqeyMiiIEGnFE_",
  5: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4nM1YjAoO4RAJXZqzyw7KeD8hsUBlXQS0Wp4lNLkwt2CoVpEIBnTzzMdT2UZgO2wVViUYLVKlhTIiouqQZpmjcXzksP0gCYVN3Eg8RHVVY5C1RCXePjVQhsaNd69SZfB5HhFxyuJPsYB77nQZQMNnQGChx9dbeESfHmHIq8lRYANG4OAU1z5HWe6XLOVPucd2dO2WGAN9YHJBsZzCG2HkqkMA0UnorrggoHbbET038-qazcOxeBMTmrAwPLFsKCwqDoBBNwRdCGmZ",
};

function normalizeImageSrc(value: string | null | undefined): string | null {
  if (!value) return null;
  if (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("data:") ||
    value.startsWith("blob:") ||
    value.startsWith("/")
  ) {
    return value;
  }
  return `/${value}`;
}

export function getPostImage(post: { id: number; image: string | null }): string | null {
  return normalizeImageSrc(post.image) || blogImages[post.id] || null;
}

export async function getPosts() {
  if (isMockMode) return mockPosts.filter((p) => p.published);
  return prisma.post
    .findMany({ where: { published: true }, orderBy: { createdAt: "desc" } })
    .catch((error) => {
      console.error("BlogPage: posts query failed, falling back to mock data.", error);
      return mockPosts.filter((p) => p.published);
    });
}
