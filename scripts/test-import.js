async function testImport() {
    console.log('Testing imports...');

    const paths = [
        '@langchain/community/tools/tavily_search',
        '@langchain/community/tools/google_serper',
        '@langchain/community/tools/serpapi'
    ];

    for (const p of paths) {
        try {
            console.log(`Attempting import: ${p}`);
            const mod = await import(p);
            console.log(`✅ Success: ${p}`, Object.keys(mod));

            if (p.includes('serpapi')) {
                try {
                    const { SerpAPI } = mod;
                    const instance = new SerpAPI('test', { engine: 'google' });
                    console.log('✅ SerpAPI instantiated with engine param');
                } catch (e) {
                    console.log('❌ SerpAPI instantiation failed:', e.message);
                }
            }
        } catch (e) {
            console.log(`❌ Failed: ${p} - ${e.message}`);
        }
    }
}

testImport();
