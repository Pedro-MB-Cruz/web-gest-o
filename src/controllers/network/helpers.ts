import { SubNetwork } from "@prisma/client";

interface ExportedData extends SubNetwork {
  children: ExportedData[];
}

// export const createNetworkTree = (dataset: SubNetwork[]): ExportedData[] => {
//   let hashTable = Object.create(null);
//   dataset.forEach(
//     (aData) => (hashTable[aData.folder_id] = { ...aData, children: [] })
//   );
//   let dataTree: ExportedData[] = [];
//   dataset.forEach((aData) => {
//     if (aData.parent_id)
//       hashTable[aData.parent_id].children.push(hashTable[aData.folder_id]);
//     else dataTree.push(hashTable[aData.folder_id]);
//   });
//   return dataTree;
// };
