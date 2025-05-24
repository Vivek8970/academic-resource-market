
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  FileText, 
  Image, 
  X,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Presentation,
  Briefcase,
  Plus,
  Loader2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const UploadProduct = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category_id: "",
    university: "",
    course_code: "",
    subject: "",
    language: "English"
  });
  const [currentTag, setCurrentTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkUser();
    fetchCategories();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/auth');
      return;
    }
    setUser(session.user);
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching categories:', error);
    } else {
      setCategories(data || []);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags(prev => [...prev, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const handleFileUpload = (files: FileList | null, type: 'main' | 'preview') => {
    if (!files) return;
    
    const fileArray = Array.from(files);
    
    if (type === 'main') {
      // Validate file types for main files
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'application/zip',
        'text/plain'
      ];
      
      const validFiles = fileArray.filter(file => 
        allowedTypes.includes(file.type) && file.size <= 50 * 1024 * 1024 // 50MB limit
      );
      
      if (validFiles.length !== fileArray.length) {
        toast({
          title: "Invalid Files",
          description: "Some files were rejected. Please use PDF, DOC, DOCX, PPT, PPTX, TXT, or ZIP files under 50MB.",
          variant: "destructive",
        });
      }
      
      setUploadedFiles(validFiles);
    } else {
      // Validate image files
      const validImages = fileArray.filter(file => 
        file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024 // 10MB limit
      );
      
      if (validImages.length !== fileArray.length) {
        toast({
          title: "Invalid Images",
          description: "Some images were rejected. Please use JPG, PNG, or GIF files under 10MB.",
          variant: "destructive",
        });
      }
      
      setPreviewImages(validImages);
    }
  };

  const uploadFileToStorage = async (file: File, folder: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('listings')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) throw error;
    return data.path;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSubmitting(true);
    
    try {
      console.log('Starting upload process...');
      
      // Upload main files
      const mainFileUrls = await Promise.all(
        uploadedFiles.map(file => uploadFileToStorage(file, 'files'))
      );
      
      // Upload preview images
      const previewImageUrls = await Promise.all(
        previewImages.map(file => uploadFileToStorage(file, 'previews'))
      );
      
      console.log('Files uploaded, creating listing...');
      
      // Create listing with approved status for immediate visibility
      const listingData = {
        user_id: user.id,
        title: formData.title,
        description: formData.description,
        category_id: formData.category_id || null,
        university: formData.university || null,
        course_code: formData.course_code || null,
        subject: formData.subject || null,
        language: formData.language,
        tags: tags.length > 0 ? tags : null,
        main_file_url: mainFileUrls.length > 0 ? mainFileUrls[0] : null,
        preview_images: previewImageUrls.length > 0 ? previewImageUrls : null,
        file_type: uploadedFiles[0]?.type || null,
        file_size: uploadedFiles[0]?.size || null,
        status: 'approved', // Auto-approve for immediate visibility
        download_count: 0
      };
      
      console.log('Listing data:', listingData);
      
      const { data, error } = await supabase
        .from('listings')
        .insert(listingData)
        .select()
        .single();
      
      if (error) {
        console.error('Database error:', error);
        throw error;
      }
      
      console.log('Listing created successfully:', data);
      
      toast({
        title: "Upload Successful!",
        description: "Your material has been published and is now available in the marketplace.",
      });
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        category_id: "",
        university: "",
        course_code: "",
        subject: "",
        language: "English"
      });
      setTags([]);
      setUploadedFiles([]);
      setPreviewImages([]);
      
      // Navigate to marketplace to see the uploaded item
      navigate('/marketplace');
      
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload material. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.title && formData.description && uploadedFiles.length > 0;

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen': return BookOpen;
      case 'FileText': return FileText;
      case 'Presentation': return Presentation;
      case 'Briefcase': return Briefcase;
      default: return FileText;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Share Your Knowledge
          </h1>
          <p className="text-slate-600">Upload educational materials and help fellow learners succeed - completely free!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <span>Basic Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="e.g., Advanced Calculus - Complete Notes Package"
                      className="mt-1 border-slate-200 focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Describe your material, what it covers, and why it's valuable..."
                      className="mt-1 min-h-[120px] border-slate-200 focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select value={formData.category_id} onValueChange={(value) => handleInputChange('category_id', value)}>
                        <SelectTrigger className="mt-1 border-slate-200 focus:border-blue-500">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => {
                            const IconComponent = getCategoryIcon(category.icon);
                            return (
                              <SelectItem key={category.id} value={category.id}>
                                <div className="flex items-center space-x-2">
                                  <IconComponent className="h-4 w-4" />
                                  <span className="capitalize">{category.name}</span>
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="language">Language</Label>
                      <Select value={formData.language} onValueChange={(value) => handleInputChange('language', value)}>
                        <SelectTrigger className="mt-1 border-slate-200 focus:border-blue-500">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="Spanish">Spanish</SelectItem>
                          <SelectItem value="French">French</SelectItem>
                          <SelectItem value="German">German</SelectItem>
                          <SelectItem value="Chinese">Chinese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Academic Details */}
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Academic Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="university">University</Label>
                      <Input
                        id="university"
                        value={formData.university}
                        onChange={(e) => handleInputChange('university', e.target.value)}
                        placeholder="e.g., Stanford University"
                        className="mt-1 border-slate-200 focus:border-blue-500 transition-colors"
                      />
                    </div>

                    <div>
                      <Label htmlFor="course">Course Code</Label>
                      <Input
                        id="course"
                        value={formData.course_code}
                        onChange={(e) => handleInputChange('course_code', e.target.value)}
                        placeholder="e.g., MATH 101"
                        className="mt-1 border-slate-200 focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      placeholder="e.g., Mathematics"
                      className="mt-1 border-slate-200 focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <Label htmlFor="tags">Tags</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Input
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        placeholder="Add a tag and press Enter"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        className="flex-1 border-slate-200 focus:border-blue-500 transition-colors"
                      />
                      <Button type="button" onClick={addTag} size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                            <span>{tag}</span>
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="ml-1 hover:text-red-600 transition-colors"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* File Uploads */}
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Upload className="h-5 w-5 text-blue-600" />
                    <span>File Uploads</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="main-files">Educational Material Files *</Label>
                    <div className="mt-2 border-2 border-dashed border-blue-200 rounded-lg p-6 text-center hover:border-blue-400 transition-colors bg-blue-50/50">
                      <Upload className="h-8 w-8 mx-auto text-blue-400 mb-2" />
                      <p className="text-slate-600 mb-2">Upload your educational materials</p>
                      <p className="text-sm text-slate-500">Supports PDF, DOC, DOCX, PPT, PPTX, TXT, ZIP (Max 50MB per file)</p>
                      <input
                        type="file"
                        id="main-files"
                        multiple
                        onChange={(e) => handleFileUpload(e.target.files, 'main')}
                        className="hidden"
                        accept=".pdf,.doc,.docx,.ppt,.pptx,.zip,.txt"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="mt-2 border-blue-200 text-blue-600 hover:bg-blue-50"
                        onClick={() => document.getElementById('main-files')?.click()}
                      >
                        Select Files
                      </Button>
                    </div>
                    
                    {uploadedFiles.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex items-center space-x-2">
                              <FileText className="h-4 w-4 text-green-600" />
                              <span className="text-sm font-medium">{file.name}</span>
                              <span className="text-xs text-slate-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                            </div>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="preview-images">Preview Images (Optional)</Label>
                    <div className="mt-2 border-2 border-dashed border-purple-200 rounded-lg p-6 text-center hover:border-purple-400 transition-colors bg-purple-50/50">
                      <Image className="h-8 w-8 mx-auto text-purple-400 mb-2" />
                      <p className="text-slate-600 mb-2">Upload preview images to showcase your material</p>
                      <p className="text-sm text-slate-500">Supports JPG, PNG, GIF (Max 10MB each)</p>
                      <input
                        type="file"
                        id="preview-images"
                        multiple
                        onChange={(e) => handleFileUpload(e.target.files, 'preview')}
                        className="hidden"
                        accept="image/*"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="mt-2 border-purple-200 text-purple-600 hover:bg-purple-50"
                        onClick={() => document.getElementById('preview-images')?.click()}
                      >
                        Select Images
                      </Button>
                    </div>

                    {previewImages.length > 0 && (
                      <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2">
                        {previewImages.map((file, index) => (
                          <div key={index} className="relative">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-20 object-cover rounded-lg border border-slate-200"
                            />
                            <div className="absolute top-1 right-1 bg-green-500 text-white rounded-full p-1">
                              <CheckCircle className="h-3 w-3" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Preview Card */}
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Listing Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="aspect-video bg-slate-100 rounded-lg flex items-center justify-center">
                      {previewImages.length > 0 ? (
                        <img
                          src={URL.createObjectURL(previewImages[0])}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="text-slate-400 text-center">
                          <Image className="h-8 w-8 mx-auto mb-2" />
                          <p className="text-sm">No preview image</p>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {formData.title || "Your material title"}
                      </h3>
                      <p className="text-sm text-slate-600 line-clamp-2">
                        {formData.description || "Your material description"}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-green-600">FREE</span>
                      {formData.category_id && (
                        <Badge className="bg-blue-100 text-blue-800">
                          {categories.find(c => c.id === formData.category_id)?.name}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4">
                  {!isFormValid && (
                    <div className="flex items-center space-x-2 text-amber-600 mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm">Please fill in required fields and upload files</span>
                    </div>
                  )}
                  
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                    disabled={!isFormValid || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Publishing...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        Publish Material
                      </>
                    )}
                  </Button>
                  
                  <p className="text-xs text-slate-500 mt-2 text-center">
                    Your material will be immediately available in the marketplace
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadProduct;
