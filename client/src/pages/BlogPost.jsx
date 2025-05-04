import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FiClock, FiUser, FiTag } from 'react-icons/fi';
import { toast } from 'react-toastify';

// Mock blog post data - in a real app, this would come from an API
const blogPosts = [
  {
    id: 1,
    title: 'Interfacing SHT30 Digital Temperature and Humidity Sensor with Arduino',
    slug: 'interfacing-sht30-digital-temperature-humidity-sensor-arduino',
    content: `<p>Learn how to connect and program the SHT30 temperature and humidity sensor with Arduino for your IoT projects.</p>
    <h2>Introduction</h2>
    <p>The SHT30 is a digital temperature and humidity sensor that provides accurate measurements for various applications. In this tutorial, we'll show you how to interface it with an Arduino board.</p>
    <h2>Required Components</h2>
    <ul>
      <li>SHT30 Sensor</li>
      <li>Arduino Board</li>
      <li>Jumper Wires</li>
      <li>USB Cable</li>
    </ul>
    <h2>Wiring Diagram</h2>
    <p>Connect the SHT30 to your Arduino as follows:</p>
    <ul>
      <li>VCC to 3.3V or 5V</li>
      <li>GND to GND</li>
      <li>SCL to A5 (Uno) or SCL (Nano)</li>
      <li>SDA to A4 (Uno) or SDA (Nano)</li>
    </ul>
    <h2>Code Example</h2>
    <pre><code class="language-arduino">#include &lt;Wire.h&gt;
#include &lt;Adafruit_SHT31.h&gt;

Adafruit_SHT31 sht31 = Adafruit_SHT31();

void setup() {
  Serial.begin(9600);
  
  if (!sht31.begin(0x44)) { // or 0x45, depending on your sensor
    Serial.println("SHT31 not found!");
    while (1);
  }
}

void loop() {
  float temperature = sht31.readTemperature();
  float humidity = sht31.readHumidity();
  
  Serial.print("Temperature: ");
  Serial.print(temperature);
  Serial.println("°C");
  
  Serial.print("Humidity: ");
  Serial.print(humidity);
  Serial.println("%");
  
  delay(2000);
}</code></pre>
    <h2>Conclusion</h2>
    <p>Now you know how to interface and use the SHT30 sensor with Arduino. This setup can be used in various IoT projects where temperature and humidity monitoring is required.</p>`,
    featuredImage: '/images/blog/sht30-arduino.jpg',
    category: 'Arduino',
    author: 'John Smith',
    date: '2025-04-15',
    tags: ['Arduino', 'Sensors', 'IoT', 'Temperature'],
    views: 1245,
  },
  // Add more posts as needed
];

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const selectedPost = blogPosts.find(p => p.id.toString() === id);
    if (selectedPost) {
      setPost(selectedPost);
    } else {
      toast.error('Blog post not found');
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
          <Link
            to="/blog"
            className="inline-block px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            to="/blog"
            className="text-primary hover:text-primary-dark mb-4 inline-block"
          >
            ← Back to Blog
          </Link>
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center space-x-4 text-gray-600 mb-6">
            <div className="flex items-center space-x-2">
              <FiUser />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FiClock />
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FiTag />
              <span>{post.category}</span>
            </div>
          </div>
        </div>

        {post.featuredImage && (
          <div className="mb-8">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        )}

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-8 border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
