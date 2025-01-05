// ================ API配置 ================
// 后端API接口地址配置，部署时需要修改为实际的后端地址
const API = {
    CATEGORIES: '/api/categories',  // 获取所有分类的接口
    TOPICS: '/api/topics',          // 获取话题列表的接口
    TOPIC_DETAIL: '/api/topics/',   // 获取话题详情的接口，使用时需要加上话题ID
    STATS: '/api/stats'             // 获取统计数据的接口
};

// ================ 模拟数据 ================
// 模拟分类数据，实际项目中应该从后端获取
const mockCategories = [
    { id: 'all', name: '全部话题' },
    { id: 'tech', name: '科技' },
    { id: 'economy', name: '数字经济' },
    { id: 'military', name: '军事' },
    { id: 'society', name: '社会' },
    { id: 'entertainment', name: '文娱' }
];

// 模拟话题数据，实际项目中应该从后端获取
// 每个话题对象的数据结构示例
const mockTopics = [
    { 
        id: 1,                      // 话题ID
        name: "人工智能发展",       // 话题名称
        category: "tech",           // 话题分类
        count: 1000,               // 讨论量
        growth: "+15%",            // 增长率
        users: 5000,               // 参与人数
        trend: "up",               // 趋势（up/down/stable）
        description: "随着深度学习技术的突破，人工智能在各个领域的应用不断扩大，引发广泛讨论。",
        time: "2024-03-20 10:30",  // 发布时间
        relatedTopics: ["机器学习", "深度学习", "神经网络"], // 相关话题
        comments: [                // 评论数组
            {
                id: 1,
                user: "科技达人",
                content: "AI技术发展太快了，需要及时跟进学习。",
                time: "10:30",
                likes: 120         // 点赞数
            },
            {
                id: 2,
                user: "未来探索者",
                content: "期待AI在医疗领域带来更多突破。",
                time: "10:45",
                likes: 89
            }
        ]
    },
    { 
        id: 2, 
        name: "数字人民币试点扩大", 
        category: "economy",
        count: 800,
        growth: "+10%",
        users: 3000,
        trend: "up",
        description: "数字人民币试点范围进一步扩大，更多城市加入试点行列。",
        time: "2024-03-20 09:15",
        relatedTopics: ["金融科技", "支付革新", "数字货币"],
        comments: [
            {
                id: 1,
                user: "金融专家",
                content: "数字人民币的推广对金融行业的影响是深远的。",
                time: "09:30",
                likes: 100
            },
            {
                id: 2,
                user: "未来探索者",
                content: "数字人民币的试点扩大对支付方式的影响值得关注。",
                time: "09:45",
                likes: 75
            }
        ]
    },
    { 
        id: 3, 
        name: "新型战机服役", 
        category: "military",
        count: 750,
        growth: "+12%",
        users: 2500,
        trend: "up",
        description: "最新型号战机正式服役，展示强大作战能力。",
        time: "2024-03-20 08:45",
        relatedTopics: ["军事装备", "空军建设", "国防科技"],
        comments: [
            {
                id: 1,
                user: "军事评论员",
                content: "新型战机的服役对国防安全具有重要意义。",
                time: "08:45",
                likes: 90
            },
            {
                id: 2,
                user: "未来探索者",
                content: "新型战机的服役对空军建设的影响值得关注。",
                time: "08:55",
                likes: 60
            }
        ]
    }
];

// ================ 数据获取函数 ================
/**
 * 通用数据获取函数
 * @param {string} url - API地址
 * @param {object} options - 请求选项
 * @returns {Promise} 返回请求的数据
 */
async function fetchData(url, options = {}) {
    try {
        showLoading(true);
        // TODO: 实际部署时启用以下代码，并删除模拟数据返回
        // const response = await fetch(url, options);
        // const data = await response.json();
        // return data;

        // 模拟API延迟
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // 模拟数据返回逻辑，实际部署时删除
        if (url === API.CATEGORIES) return mockCategories;
        if (url === API.TOPICS) {
            return mockTopics.filter(topic => 
                options.category === 'all' || topic.category === options.category
            );
        }
        if (url.startsWith(API.TOPIC_DETAIL)) {
            const topicId = parseInt(url.split('/').pop());
            return mockTopics.find(t => t.id === topicId);
        }
        if (url === API.STATS) {
            return {
                totalTopics: mockTopics.length,
                totalUsers: 10000,
                totalDiscussions: mockTopics.reduce((sum, topic) => sum + topic.count, 0)
            };
        }
    } catch (error) {
        console.error('数据获取失败:', error);
        throw error;
    } finally {
        showLoading(false);
    }
}

// ================ 页面初始化函数 ================
/**
 * 页面加载完成后的初始化函数
 * 包括设置分类导航、更新统计信息、显示话题列表等
 */
function initializePage() {
    setupCategoryNav();    // 设置分类导航
    updateHeaderStats();   // 更新头部统计信息
    updateTopicsList();    // 更新话题列表
    setupEventListeners(); // 设置事件监听器
    showLoading(false);    // 隐藏加载动画
}

// ================ WebSocket实时更新 ================
/**
 * 设置WebSocket连接，用于实时数据更新
 * TODO: 实际部署时需要修改WebSocket地址和处理逻辑
 */
function setupWebSocket() {
    try {
        // 替换为实际的WebSocket服务器地址
        const ws = new WebSocket('ws://your-backend-url/ws');
        
        // WebSocket消息处理
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'stats_update') {
                updateHeaderStats();
            }
            // TODO: 添加其他类型的实时更新处理
        };
        
        // 错误处理和重连逻辑
        ws.onerror = (error) => {
            console.error('WebSocket错误:', error);
        };
        
        ws.onclose = () => {
            console.log('WebSocket连接关闭，尝试重新连接...');
            setTimeout(setupWebSocket, 5000);
        };
    } catch (error) {
        console.error('WebSocket连接失败:', error);
        setTimeout(setupWebSocket, 5000);
    }
}

// ================ 交互功能函数 ================
/**
 * 话题分享功能
 * TODO: 实现实际的分享逻辑
 */
function shareTopic() {
    alert('分享功能开发中...');
}

/**
 * 话题关注功能
 * TODO: 添加与后端的交互
 */
function toggleFollow() {
    const btn = document.getElementById('followBtn');
    const isFollowing = btn.classList.toggle('active');
    btn.innerHTML = isFollowing ? 
        '<i class="fas fa-star"></i> 已关注' : 
        '<i class="fas fa-star"></i> 关注';
}

/**
 * 评论点赞功能
 * TODO: 添加与后端的交互
 * @param {number} commentId - 评论ID
 */
function likeComment(commentId) {
    console.log(`点赞评论: ${commentId}`);
    // TODO: 实现点赞功能
}

// ================ 工具函数 ================
/**
 * 显示/隐藏加载动画
 * @param {boolean} show - 是否显示加载动画
 */
function showLoading(show) {
    const loading = document.getElementById('loading');
    loading.style.display = show ? 'flex' : 'none';
}

// 当前选中的分类
let currentCategory = 'all';

// 添加分类切换功能
function setupCategoryNav() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            // 更新导航项状态
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            // 切换分类
            currentCategory = item.dataset.category;
            updateTopicsList();
            
            // 更新页面标题
            updateCategoryTitle();
        });
    });
}

// 修改话题列表更新函数
async function updateTopicsList() {
    try {
        const topics = await fetchData(API.TOPICS, { category: currentCategory });
        const topicsList = document.getElementById('topicsList');
        topicsList.innerHTML = '';
        
        if (topics.length === 0) {
            topicsList.innerHTML = '<div class="no-topics">该分类暂无话题</div>';
            return;
        }
        
        topics.forEach(topic => {
            const li = document.createElement('li');
            li.className = 'topic-item';
            li.innerHTML = `
                <div class="topic-info">
                    <div class="topic-name">${topic.name}</div>
                    <div class="topic-count">讨论量: ${topic.count}</div>
                </div>
                <div class="topic-trend ${topic.trend}">
                    ${topic.growth}
                    <i class="fas fa-arrow-${topic.trend === 'up' ? 'up' : 'right'}"></i>
                </div>
            `;
            li.onclick = () => showTopicDetail(topic.id);
            topicsList.appendChild(li);
        });
        
        updateCategoryStats(topics);
        updateHeaderStats();
    } catch (error) {
        console.error('话题列表加载失败:', error);
    }
}

// 修改话题详情显示函数
async function showTopicDetail(topicId) {
    try {
        const topic = await fetchData(API.TOPIC_DETAIL + topicId);
        
        // 更新活跃状态
        document.querySelectorAll('.topic-item').forEach(item => {
            item.classList.remove('active');
        });
        event.currentTarget.classList.add('active');
        
        // 更新详情面板
        document.getElementById('selectedTopicTitle').textContent = topic.name;
        document.getElementById('detailCount').textContent = topic.count;
        document.getElementById('detailGrowth').textContent = topic.growth;
        document.getElementById('detailUsers').textContent = topic.users;
        
        // 更新话题详细信息
        document.getElementById('topicCategory').textContent = topic.category;
        document.getElementById('topicTime').textContent = topic.time;
        document.getElementById('topicDescription').textContent = topic.description;
        
        // 更新相关内容
        updateRelatedTopics(topic.relatedTopics);
        updateComments(topic.comments);
    } catch (error) {
        console.error('话题详情加载失败:', error);
    }
}

// 修改统计信息更新函数
async function updateHeaderStats() {
    try {
        const stats = await fetchData(API.STATS);
        // 根据当前分类显示对应的话题数
        const currentTopics = currentCategory === 'all' 
            ? mockTopics.length 
            : mockTopics.filter(topic => topic.category === currentCategory).length;
        document.getElementById('todayTopics').textContent = currentTopics;
        document.getElementById('totalUsers').textContent = stats.totalUsers.toLocaleString();
        document.getElementById('lastUpdate').textContent = new Date().toLocaleTimeString();
    } catch (error) {
        console.error('统计信息更新失败:', error);
    }
}

// 更新分类统计信息
function updateCategoryStats(topics) {
    document.getElementById('topicCount').textContent = topics.length;
    document.getElementById('totalDiscussions').textContent = topics.reduce((sum, topic) => sum + topic.count, 0);
}

// 更新页面标题
function updateCategoryTitle() {
    const categoryTitles = {
        'all': '全部话题',
        'tech': '科技话题',
        'economy': '数字经济',
        'military': '军事话题',
        'society': '社会话题',
        'entertainment': '文娱话题'
    };
    
    document.getElementById('categoryTitle').textContent = categoryTitles[currentCategory];
}

// 更新相关话题
function updateRelatedTopics(relatedTopics) {
    const container = document.getElementById('relatedTopicsList');
    container.innerHTML = '';
    
    relatedTopics.forEach(topic => {
        const tag = document.createElement('div');
        tag.className = 'related-topic-tag';
        tag.textContent = topic;
        tag.onclick = () => console.log(`Clicked related topic: ${topic}`);
        container.appendChild(tag);
    });
}

// 更新评论列表
function updateComments(comments) {
    const container = document.getElementById('commentsList');
    container.innerHTML = '';
    
    comments.forEach(comment => {
        const div = document.createElement('div');
        div.className = 'comment-item';
        div.innerHTML = `
            <div class="comment-header">
                <div class="comment-user">
                    <div class="user-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <span class="user-name">${comment.user}</span>
                </div>
                <span class="comment-time">${comment.time}</span>
            </div>
            <div class="comment-content">${comment.content}</div>
            <div class="comment-actions">
                <span class="comment-action" onclick="likeComment(${comment.id})">
                    <i class="fas fa-thumbs-up"></i> ${comment.likes}
                </span>
                <span class="comment-action" onclick="replyComment(${comment.id})">
                    <i class="fas fa-reply"></i> 回复
                </span>
            </div>
        `;
        container.appendChild(div);
    });
}

// 设置事件监听器
function setupEventListeners() {
    // 话题过滤器
    document.getElementById('topicFilter').onchange = (e) => {
        console.log(`Filter changed to: ${e.target.value}`);
        // 这里可以添加过滤逻辑
    };
    
    // 添加话题操作按钮事件
    document.getElementById('shareBtn').onclick = shareTopic;
    document.getElementById('followBtn').onclick = toggleFollow;
    document.getElementById('reportBtn').onclick = reportTopic;
    
    // 添加话题过滤按钮事件
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.onclick = (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            filterRelatedTopics(e.target.dataset.filter);
        };
    });
}

function reportTopic() {
    // 实现举报功能
    alert('举报功能开发中...');
}

function replyComment(commentId) {
    // 实现回复功能
    console.log(`回复评论: ${commentId}`);
}

// 过滤相关话题
function filterRelatedTopics(filter) {
    // 实现过滤功能
    console.log(`过滤相关话题: ${filter}`);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initializePage); 