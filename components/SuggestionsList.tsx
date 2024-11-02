// TODO: Implement SuggestionsList component
export function SuggestionsList({ suggestions }: { suggestions: string[] }) {
  return (
    <ul>
      {suggestions.map((suggestion, index) => (
        <li key={index}>{suggestion}</li>
      ))}
    </ul>
  )
}
