<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Validator;
use Storage;
class CategoryController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['index']]);
    }
    /**
     * @OA\Get(
     *     tags={"Category"},
     *     path="/api/category",
     *     @OA\Parameter(
     *         name="page",
     *         in="query",
     *         required=true,
     *         @OA\Schema(
     *             type="string"
     *         ),
     *         description="Page number default 1"
     *     ),
     *     @OA\Response(response="200", description="List Categories.")
     * )
     */
    public function  index(){

        $list=Category::paginate(2);
        return response()->json($list);
    }
    /**
     * @OA\Post(
     *     tags={"Category"},
     *     path="/api/category",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 required={"image", "name", "description"},
     *                 @OA\Property(
     *                     property="image",
     *                     type="string",
     *                     format="binary"
     *                 ),
     *                 @OA\Property(
     *                     property="name",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="description",
     *                     type="string"
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(response="200", description="Add Category.")
     * )
     */
    public function store(Request $request)
    {
        //отримуємо дані із запиту(name, image, description)
        $input = $request->all();
        $messages = array(
            'name.required' => 'Вкажіть назву категорії!',
            'description.required' => 'Вкажіть опис категорії!',
            'image.required' => 'Оберіть фото категорії!'
        );
        $validator = Validator::make($input, [
            'name' => 'required',
            'description' => 'required',
            'image' => 'required',
        ], $messages);
        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        $filename = uniqid(). '.' .$request->file("image")->getClientOriginalExtension();
        Storage::disk('local')->put("public/uploads/".$filename,file_get_contents($request->file("image")));
        $input["image"] = $filename;

        $category = Category::create($input);
        return response()->json($category);
    }


    public function update($id, Request $request)
    {
        // Валидация данных из $request
        $validator = Validator::make($request->all(), [
            'name.required' => 'Вкажіть назву категорії!',
            'description.required' => 'Вкажіть опис категорії!',
            'image.required' => 'Оберіть фото категорії!'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        // Поиск ресурса по $id
        $category = Category::find($id);

        // Если ресурс не найден, возвращаем ошибку 404
        if (!$category ) {
            return response()->json(['error' => 'Ресурс не найден'], 404);
        }

        // Обновление ресурса с данными из $request
        $category ->name = $request->input('name');
        $category ->description = $request->input('description');
        $category ->save();

        // Возвращаем успешный ответ
        return response()->json(['message' => 'Ресурс успешно обновлен']);
    }
    /**
     * @OA\Delete(
     *     path="/api/category/{id}",
     *     tags={"Category"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="Идентификатор категории",
     *         required=true,
     *         @OA\Schema(
     *             type="number",
     *             format="int64"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Успешное удаление категории"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Категория не найдена"
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Не авторизован"
     *     )
     * )
     */
    public function delete($id)
    {
        $item =  Category::findOrFail($id);
        $item->delete();
        return response()->json(['message' => 'категорію видалено']);
    }



}
