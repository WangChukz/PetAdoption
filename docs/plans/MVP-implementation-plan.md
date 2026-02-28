# Pet Adoption - Giai đoạn 1 (MVP) Implementation Plan

**Goal:** Xây dựng phiên bản MVP cơ bản cho website Pet Adoption với tính năng hiển thị danh sách thú cưng, hồ sơ người dùng và form xin nhận nuôi.

**Architecture:** Frontend sử dụng Next.js (React) để render UI tương tác và SEO tốt. Backend sử dụng Laravel làm API server kết nối với MySQL database.

**Tech Stack:**
*   Frontend: Next.js, TailwindCSS, Axios
*   Backend: Laravel 12, MySQL
*   Database: MySQL

---

### Task 1: Khởi tạo Backend Laravel & Database

**Files:**
*   Create: Backend Project Files
*   Modify: `.env`

**Step 1: Cài đặt Laravel**
Run: `composer create-project laravel/laravel pet-adoption-api`

**Step 2: Cấu hình Database**
Modify file `.env` trong thư mục `pet-adoption-api`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=pet_adoption
DB_USERNAME=root
DB_PASSWORD=
```

**Step 3: Tạo Schema & Migrations**
Run: `php artisan make:model Pet -m`
Run: `php artisan make:model AdoptionApplication -m`

Modify file migration của `Pets`:
```php
public function up()
{
    Schema::create('pets', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('species');
        $table->string('source_type')->default('internal');
        $table->json('personality_tags')->nullable();
        $table->timestamps();
    });
}
```

Modify file migration của `AdoptionApplications`:
```php
public function up()
{
    Schema::create('adoption_applications', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained();
        $table->foreignId('pet_id')->constrained();
        $table->string('status')->default('pending');
        $table->timestamps();
    });
}
```

**Step 4: Chạy Migration**
Run: `php artisan migrate`

---

### Task 2: Xây dựng API Endpoints (Laravel)

**Files:**
*   Create: `app/Http/Controllers/Api/PetController.php`
*   Create: `app/Http/Controllers/Api/AdoptionController.php`
*   Modify: `routes/api.php`

**Step 1: Tạo controller cho Pets & Adoptions**
Run: `php artisan make:controller Api/PetController --api`
Run: `php artisan make:controller Api/AdoptionController --api`

**Step 2: Khai báo Routes**
Modify `routes/api.php`:
```php
use App\Http\Controllers\Api\PetController;
use App\Http\Controllers\Api\AdoptionController;

Route::get('/pets', [PetController::class, 'index']);
Route::post('/adoptions', [AdoptionController::class, 'store']);
Route::get('/adoptions/{id}', [AdoptionController::class, 'show']);
```

**Step 3: Viết logic cho PetController**
Modify `app/Http/Controllers/Api/PetController.php`:
```php
public function index()
{
    // Lấy danh sách thú cưng với phân trang cơ bản
    $pets = Pet::paginate(10);
    return response()->json($pets);
}
```

**Step 4: Viết logic cho AdoptionController**
Modify `app/Http/Controllers/Api/AdoptionController.php`:
```php
public function store(Request $request)
{
    // Validate request
    $request->validate([
        'user_id' => 'required|exists:users,id',
        'pet_id' => 'required|exists:pets,id',
    ]);

    // Sử dụng Database Transaction để đảm bảo toàn vẹn dữ liệu
    DB::beginTransaction();
    try {
        $application = AdoptionApplication::create([
            'user_id' => $request->user_id,
            'pet_id' => $request->pet_id,
            'status' => 'pending',
        ]);
        DB::commit();
        return response()->json($application, 201);
    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json(['error' => 'Could not process application'], 500);
    }
}
```

---

### Task 3: Khởi tạo Frontend Next.js

**Files:**
*   Create: Frontend Project Files
*   Modify: `app/globals.css`, `tailwind.config.js`

**Step 1: Tạo dự án Next.js**
Run: `npx create-next-app@latest pet-adoption-web --typescript --tailwind --eslint --app --no-src-dir`

**Step 2: Cài đặt Brand Identity (Sử dụng kiến thức từ Giai đoạn 1 Bước 2)**
Modify `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F4A261',
        secondary: '#2A9D8F',
        background: '#FAFAFA',
      },
      fontFamily: {
        heading: ['var(--font-nunito)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

Modify `app/layout.tsx` để import Fonts (Nunito, Inter):
```tsx
import { Inter, Nunito } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito' })

export const metadata = {
  title: 'Pawsitive Match',
  description: 'Adopt your next best friend',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${nunito.variable} bg-background font-body`}>
        {children}
      </body>
    </html>
  )
}
```

---

### Task 4: Xây dựng Giao diện (MVP UI)

**Files:**
*   Create: `app/components/PetCard.tsx`
*   Modify: `app/page.tsx`

**Step 1: Tạo Component PetCard**
Create `app/components/PetCard.tsx`:
```tsx
export default function PetCard({ pet }: { pet: any }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition hover:-translate-y-1 hover:shadow-lg">
      <div className="h-48 bg-gray-200"></div> {/* Placeholder cho hình ảnh */}
      <div className="p-4">
        <h3 className="font-heading text-xl font-bold text-gray-800">{pet.name}</h3>
        <p className="text-secondary font-medium">{pet.species}</p>
        <button className="mt-4 w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-opacity-90 transition">
          Nhận nuôi
        </button>
      </div>
    </div>
  )
}
```

**Step 2: Tạo trang chủ hiển thị danh sách**
Modify `app/page.tsx`:
```tsx
import PetCard from './components/PetCard'

// Mock Data (Tạm thời cho đến khi nối API thực)
const mockPets = [
  { id: 1, name: 'Milo', species: 'Dog' },
  { id: 2, name: 'Luna', species: 'Cat' },
]

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="font-heading text-4xl font-bold text-center text-secondary mb-8">
        Tìm kiếm người bạn bốn chân
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockPets.map(pet => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
    </main>
  )
}
```
