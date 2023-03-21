export default function Toggle() {
  return (
    <label class="flex items-center relative w-max cursor-pointer select-none">
      <span class="text-lg font-bold mr-3">Pre-test </span>
      <input
        type="checkbox"
        class="appearance-none transition-colors cursor-pointer w-14 h-7 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-blue-500 bg-red-500"
      />
    </label>
  );
}
