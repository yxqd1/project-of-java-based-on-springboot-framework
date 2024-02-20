import { AcGameObject } from "./AcGameObject";
import { Wall } from "./Wall";
import { Snake } from "./Snake";
export class GameMap extends AcGameObject {
    constructor(ctx, parent, store) {
        super();
        this.ctx = ctx;
        this.parent = parent;
        // 绑定状态
        this.store = store;
        this.L = 0;

        // 尽量防止平白无故相撞
        this.rows = 13;
        this.cols = 14;
        // 后边的墙覆盖前边的墙
        // 障碍物数量
        this.inner_walls_count = 20;
        this.walls = [];

        // 蛇相关的内容,定义蛇、声明蛇头等
        this.snakes = [
            new Snake({ id: 0, color: "#4876EC", r: this.rows - 2, c: 1 }, this),
            new Snake({ id: 1, color: "#F94848", r: 1, c: this.cols - 2 }, this),
        ];
    }
    // // 判断连通性
    // check_connectivity(g, sx, sy, tx, ty) {
    //     if (sx == tx && sy == ty) return true;
    //     g[sx][sy] = true;
    //     let dx = [-1, 0, 1, 0], dy = [0, 1, 0, -1];
    //     for (let i = 0; i < 4; i++) {
    //         let x = sx + dx[i], y = sy + dy[i];
    //         if (!g[x][y] && this.check_connectivity(g, x, y, tx, ty))
    //             return true;

    //     }
    //     return false;

    // }
    create_walls() {
        const g = this.store.state.pk.gamemap;

        // const g = [];
        // for (let r = 0; r < this.rows; r++) {
        //     g[r] = [];
        //     for (let c = 0; c < this.cols; c++) {
        //         g[r][c] = false;
        //     }
        // }
        // //给四周加上障碍物
        // // 竖着的
        // for (let r = 0; r < this.rows; r++) {
        //     g[r][0] = g[r][this.cols - 1] = true;
        // }
        // // 横着的
        // for (let c = 0; c < this.cols; c++) {
        //     g[0][c] = g[this.rows - 1][c] = true;
        // }
        // // 创造随机障碍物

        // for (let i = 0; i < this.inner_walls_count; i++) {
        //     for (let j = 0; j < 1000; j++) {
        //         let r = parseInt(Math.random() * this.rows);
        //         let c = parseInt(Math.random() * this.cols);
        //         if (g[r][c] || g[this.rows - 1 - r][this.cols - 1 - c]) continue;
        //         if (r == 1 && c == this.cols - 2 || (this.rows - 1 - r == this.rows - 2 && this.cols - 1 - c == 1)) continue;
        //         g[r][c] = g[this.rows - 1 - r][this.cols - 1 - c] = true;
        //         break;
        //     }
        // }
        // // 检查是否可联通
        // const copy_g = JSON.parse(JSON.stringify(g));
        // if (!this.check_connectivity(copy_g, this.rows - 2, 1, 1, this.cols - 2)) return false;
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (g[r][c]) {
                    this.walls.push(new Wall(r, c, this));
                }
            }
        }
        // return true;
    }
    // 设置监听，完成对方向的控制
    add_listening_events() {
        this.ctx.canvas.focus();
        // 通过相应API设置不同蛇
        this.ctx.canvas.addEventListener("keydown", e => {
            let d = -1;
            if (e.key === 'w') d = 0;
            else if (e.key === 'd') d = 1;
            else if (e.key === 's') d = 2;
            else if (e.key === 'a') d = 3;
            if (d >= 0) {
                this.store.state.pk.socket.send(JSON.stringify({
                    event: "move",
                    direction: d,
                }));

            }
            // else if (e.key === 'ArrowUp') snake1.set_direction(0);
            // else if (e.key === 'ArrowRight') snake1.set_direction(1);
            // else if (e.key === 'ArrowDown') snake1.set_direction(2);
            // else if (e.key === 'ArrowLeft') snake1.set_direction(3);
        });
    }
    //注意新增函数的用处
    start() {
        this.create_walls();
        // for (let i = 0; i < 1000; i++) {
        //     if (this.create_walls()) break;
        // }
        this.add_listening_events();

    }
    update_size() {
        // 采取的都是相对大小
        this.L = parseInt(Math.min(this.parent.clientWidth / this.cols, this.parent.clientHeight / this.rows));
        this.ctx.canvas.width = this.L * this.cols;
        this.ctx.canvas.height = this.L * this.rows;

    }

    //作为裁判，判断两条蛇是否都准备好下一回合了
    check_ready() {
        //状态不对或者无效
        for (const snake of this.snakes) {
            if (snake.status !== "idle") return false;
            if (snake.direction === -1) return false;
        }
        return true;
    }

    // 让两条蛇进入下一回合
    next_step() {
        for (const snake of this.snakes) {
            snake.next_step();

        }
    }

    // 检测目标位置是否合法，没有撞到两条蛇的身体和障碍物
    check_valid(cell) {
        for (const wall of this.walls) {
            if (wall.r === cell.r && wall.c === cell.c)
                return false;
        }
        for (const snake of this.snakes) {
            let k = snake.cells.length;
            if (!snake.check_tail_increasing()) // 当蛇尾会前进的时候，蛇尾不要判断
                k--;

            for (let i = 0; i < k; i++) {
                if (snake.cells[i].r === cell.r && snake.cells[i].c === cell.c)
                    return false;
            }
        }
        return true;
    }
    // 更新所需，包括 render
    update() {
        this.update_size();
        if (this.check_ready()) {
            this.next_step();
        }
        this.render();
    }
    render() {
        // 图像规格
        const color_even = "#AAD751", color_odd = "#A2D149";
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if ((r + c) % 2 == 0) {
                    this.ctx.fillStyle = color_even;
                } else {
                    this.ctx.fillStyle = color_odd;
                }
                // void ctx.fillRect(x, y, width, height); 
                this.ctx.fillRect(c * this.L, r * this.L, this.L, this.L);
            }
        }
    }
}