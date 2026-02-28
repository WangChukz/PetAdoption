import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NewsletterSubscription from '../components/NewsletterSubscription';

// Blog Specific UI Components
import BlogHeroFeatured from '../components/blog/BlogHeroFeatured';
import BlogCategoryNav from '../components/blog/BlogCategoryNav';
import BlogGrid from '../components/blog/BlogGrid';
import BlogTipsHero from '../components/blog/BlogTipsHero';
import BlogRecentPosts from '../components/blog/BlogRecentPosts';

export const metadata = {
  title: 'Blog | PetJam',
  description: 'Tips, tricks, and pet care resources.',
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white text-black font-body overflow-x-hidden flex flex-col">
      <Header />
      
      {/* 1. Large Hero Featured Article */}
      <BlogHeroFeatured />

      {/* Main Content constraints */}
      <main className="w-full bg-white z-0 mt-2 flex flex-col items-center">
        
        {/* 2. Category Nav (Inline buttons) */}
        <BlogCategoryNav />

        {/* 3. Blog Masonry Grid */}
        <BlogGrid />

        {/* 4. Tips Split Hero (Dog and Teal block) */}
        <BlogTipsHero />

        {/* 5. Recent Posts */}
        <BlogRecentPosts />

      </main>

      <div className="-mt-16 relative z-0 w-full">
         <Footer />
      </div>
    </div>
  );
}
