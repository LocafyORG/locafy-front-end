import { useState, useEffect } from 'react';
import Card from '@components/Card';
import SortControls from '@components/SortControls/SortControls';
import Cheems from '@assets/img/under-development.webp';
import { fetchProductions } from '@api/productions/fetchProductions.ts';
import { Production } from '@api/interfaces/Production.ts';
import '@styles/pages/dashboard/Productions.scss';

function Productions() {
  const [data, setData] = useState<Production[]>([]);
  const [sortKey, setSortKey] = useState("title");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProductions = async () => {
      try {
        const productions = await fetchProductions();
        setData(productions);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    getProductions();
  }, []);

  // Sort data based on the selected key
  const sortedData = [...data].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return -1;
    if (a[sortKey] > b[sortKey]) return 1;
    return 0;
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <h1>Productions</h1>
      <a className="waves-effect waves-light btn float-right">Add a new production</a>

      <SortControls onSortChange={(value) => setSortKey(value)} />
      <div className="card-container">
        {sortedData.map((item) => (
          <Card
            key={item.productionId}
            image={Cheems}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </>
  );
}

export default Productions;
