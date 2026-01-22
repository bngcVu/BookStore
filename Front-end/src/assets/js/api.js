// Mock API aligned with QUICK-START needs (homepage, search, product)
export const API = (() => {
  const books = [
    {
      id: 1,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      price: 25.0,
      condition: 'Fine',
      seller: 'Rare Books Emporium',
      image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=640&auto=format&fit=crop',
      description: 'A modern classic exploring racial injustice in the Deep South.',
      isbn: '9780061120084'
    },
    {
      id: 2,
      title: '1984',
      author: 'George Orwell',
      price: 18.5,
      condition: 'Very Good',
      seller: 'Antiquarian House',
      image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=640&auto=format&fit=crop',
      description: 'Dystopian novel depicting a totalitarian regime and surveillance state.',
      isbn: '9780451524935'
    },
    {
      id: 3,
      title: 'Brave New World',
      author: 'Aldous Huxley',
      price: 22.0,
      condition: 'Fine',
      seller: 'First Editions Co.',
      image: 'https://images.unsplash.com/photo-1519681391609-9d8ff55a4987?q=80&w=640&auto=format&fit=crop',
      description: 'A prophetic vision of a scientifically engineered future society.',
      isbn: '9780060850524'
    },
    {
      id: 4,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      price: 29.0,
      condition: 'Good',
      seller: 'Classic Pages',
      image: 'https://images.unsplash.com/photo-1455885666463-9cbe3ebc325d?q=80&w=640&auto=format&fit=crop',
      description: 'A tragic story of Jay Gatsby and the American Dream in the 1920s.',
      isbn: '9780743273565'
    }
  ];

  function getFeaturedBooks(limit = 8) {
    return books.slice(0, limit);
  }

  function getBooks() {
    return books;
  }

  function getBookById(id) {
    return books.find(b => String(b.id) === String(id));
  }

  function searchBooks(q) {
    if (!q) return books;
    const term = q.toLowerCase();
    return books.filter(b =>
      b.title.toLowerCase().includes(term) ||
      b.author.toLowerCase().includes(term) ||
      (b.isbn && b.isbn.toLowerCase().includes(term))
    );
  }

  return { getFeaturedBooks, getBooks, getBookById, searchBooks };
})();
