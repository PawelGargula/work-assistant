import { Group } from '@prisma/client';

export default function SelectGroup({ defaultValue, groups }: { defaultValue: string, groups: Group[] }) {
  return (
    <div className="mb-4">
      <label htmlFor="group" className="block font-medium mb-2 text-sm">
        Assign to Group
      </label>
      <select
        className="border border-gray-200 cursor-pointer focus-visible:outline-violet-500 p-2 rounded-md"
        defaultValue={defaultValue}
        id="group" 
        name="group"
      >
        <option value="">None</option>
        {groups.map(group => <option key={group.id} value={group.id}>{group.name}</option>)}
      </select>
    </div>
  );
} 