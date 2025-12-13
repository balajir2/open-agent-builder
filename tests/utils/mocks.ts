// Mock implementation of Convex DB and Auth for unit testing

export const createMockDb = (initialData: any = {}) => {
  const data = { ...initialData };
  
  return {
    query: (tableName: string) => {
      return {
        withIndex: (indexName: string, qFunc: any) => {
          return {
            collect: async () => {
                // simple mock implementation - assumes by_userId for now as that's what we use
                if (indexName === 'by_userId' && initialData[tableName]) {
                    // Logic to filter would go here, but for now return all for table
                    return initialData[tableName];
                }
                return initialData[tableName] || [];
            },
            filter: (filterFunc: any) => {
                return {
                    collect: async () => {
                         return initialData[tableName] || [];
                    },
                    first: async () => {
                        const items = initialData[tableName] || [];
                        return items.length > 0 ? items[0] : null;
                    }
                }
            },
            first: async () => {
                 const items = initialData[tableName] || [];
                 return items.length > 0 ? items[0] : null;
            }
          };
        },
        collect: async () => {
            return initialData[tableName] || [];
        },
        filter: (filterFunc: any) => {
             return {
                 collect: async () => {
                     // Very basic mock, ignoring actual filter logic for simplicity unless needed
                     return initialData[tableName] || [];
                 }
             }
        }
      };
    },
    get: async (id: string) => {
        // Search all tables
        for (const table of Object.values(data) as any[]) {
            const item = table.find((i: any) => i._id === id);
            if (item) return item;
        }
        return null;
    },
    insert: async (table: string, doc: any) => {
        if (!data[table]) data[table] = [];
        const _id = `${table}_${Date.now()}_${Math.random()}`;
        data[table].push({ ...doc, _id });
        return _id;
    },
    patch: async (id: string, updates: any) => {
        for (const tableKey in data) {
            const index = data[tableKey].findIndex((i: any) => i._id === id);
            if (index !== -1) {
                data[tableKey][index] = { ...data[tableKey][index], ...updates };
                return;
            }
        }
    },
    delete: async (id: string) => {
        for (const tableKey in data) {
             const index = data[tableKey].findIndex((i: any) => i._id === id);
             if (index !== -1) {
                 data[tableKey].splice(index, 1);
                 return;
             }
        }
    }
  };
};

export const createMockAuth = (userId: string | null = 'test-user') => {
  return {
    getUserIdentity: async () => {
      if (!userId) return null;
      return { subject: userId };
    }
  };
};

export const createMockContext = (initialData: any = {}, userId: string | null = 'test-user') => {
    return {
        db: createMockDb(initialData),
        auth: createMockAuth(userId),
    };
};
