import React from 'react';

const App = () => {
  return (
    <div className="container mx-auto px-4 bg-yellow-200">
      <header className="py-4 bg-pink-300">
        <h1 className="text-2xl font-bold">My Blog</h1>
      </header>
      <main>
        <section className="my-8 bg-red-100">
          <h2 className="text-xl font-bold">Latest Posts</h2>
          Render latest posts
        </section>
        <section className="my-8 bg-green-100">
          <h2 className="text-xl font-bold">Popular Posts</h2>
          Render popular posts
        </section>
      </main>
      <footer className="py-4 bg-blue-300">
        <p>Footer content</p>
      </footer>
    </div>
  );
};
export default App;
