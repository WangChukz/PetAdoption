export default function PetCard({ pet }: { pet: any }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition hover:-translate-y-1 hover:shadow-lg">
      <div className="h-48 bg-gray-200"></div> {/* Placeholder cho hình ảnh */}
      <div className="p-4">
        <h3 className="font-heading text-xl font-bold text-gray-800">{pet.name}</h3>
        <p className="text-secondary font-medium">{pet.species}</p>
        <button className="mt-4 w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-opacity-90 transition cursor-pointer">
          Nhận nuôi
        </button>
      </div>
    </div>
  )
}
