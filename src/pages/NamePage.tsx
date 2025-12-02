import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://grfgqztuedpmyrrwrmly.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdyZmdxenR1ZWRwbXlycndybWx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2ODcxMTMsImV4cCI6MjA4MDI2MzExM30.U-YAXJHT36ABHpDLxEYINkrXVPDVI_vf1Lf_O9JK88I';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Name {
  name: string;
}

export default function NamePage() {
  const [names, setNames] = useState<Name[]>([]);

  useEffect(() => {
    const fetchNames = async () => {
      const { data, error } = await supabase
        .from('marty')
        .select('name');

      if (error) console.error('Error fetching names:', error);
      else setNames(data as Name[]);
    };

    fetchNames();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">List of Names</h1>
      <ul className="list-disc pl-5">
        {names.map((item, index) => (
          <li key={index} className="text-lg text-gray-700">{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
