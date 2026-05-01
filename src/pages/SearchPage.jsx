import LegacySearchContent from "../components/LegacySearchContent";

export default function SearchPage() {
  return <LegacySearchContent />;

  function SearchPage() {
 const filters = ['All', 'Movies', 'TV Shows', 'Top Rated', 'Recently Added'];


 return (
   <main style={{ padding: '2rem' }}>
     <h1>Search</h1>
     <p>Find movies and shows using keywords and filters.</p>


     <section aria-labelledby="search-controls" style={{ marginTop: '1.5rem' }}>
       <h2 id="search-controls">Search Controls</h2>
       <input
         type="text"
         placeholder="Search titles..."
         aria-label="Search titles"
         style={{ padding: '0.5rem', minWidth: '260px' }}
       />


       <div style={{ marginTop: '1rem' }}>
         <strong>Filters:</strong>
         <ul>
           {filters.map((filter) => (
             <li key={filter}>{filter}</li>
           ))}
         </ul>
       </div>
     </section>
   </main>
 );
}
}