// Quick database check
import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from "ws";

neonConfig.webSocketConstructor = ws;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function checkDatabase() {
  try {
    console.log('🔍 CHECKING DATABASE CONTENTS...');
    
    // Simple query to see what's in brands table
    const result = await pool.query('SELECT id, name, sector_id, is_core FROM brands ORDER BY id DESC LIMIT 15');
    
    console.log('📊 LATEST 15 BRANDS IN DATABASE:');
    result.rows.forEach((row, i) => {
      console.log(`${i+1}. ${row.name} (ID: ${row.id}, Sector: ${row.sector_id}, Core: ${row.is_core})`);
    });
    
    // Check AI Logic sector
    const aiResult = await pool.query(`
      SELECT b.id, b.name, b.is_core 
      FROM brands b 
      JOIN sectors s ON b.sector_id = s.id 
      WHERE s.name = '🧠 AI, Logic & Grid' 
      AND b.is_core = true
      ORDER BY b.id 
      LIMIT 10
    `);
    
    console.log('\n🧠 AI LOGIC GRID CORE BRANDS:');
    aiResult.rows.forEach((row, i) => {
      console.log(`${i+1}. ${row.name} (ID: ${row.id})`);
    });
    
    await pool.end();
    
  } catch (error) {
    console.error('❌ Database check failed:', error);
  }
}

checkDatabase();