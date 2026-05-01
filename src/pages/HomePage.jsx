import LegacyHomeContent from "../components/LegacyHomeContent";

export default function HomePage() {
  return <LegacyHomeContent />;

  function HomePage() {
 const trending = [
   'The Last Horizon',
   'Neon District',
   'Echoes of Time',
   'Shadow Protocol',
   'Midnight Signal'
 ];


 return (
   <main style={{ padding: '2rem' }}>
     <h1>Home</h1>
     <p>Browse and discover trending movies and TV shows.</p>


     <section aria-labelledby="trending-title" style={{ marginTop: '1.5rem' }}>
       <h2 id="trending-title">Trending Now</h2>
       <ul>
         {trending.map((title) => (
           <li key={title}>{title}</li>
         ))}
       </ul>
     </section>
   </main>
 );
}

}