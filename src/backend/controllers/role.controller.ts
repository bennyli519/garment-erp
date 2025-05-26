import { NextResponse } from 'next/server';
import { RoleService } from '@/backend/services/role.service';
import type { CreateRoleDto, UpdateRoleDto } from '@/backend/types/role.types';

export class RoleController {
  static async create(req: Request) {
    try {
      const data = (await req.json()) as CreateRoleDto;
      const role = await RoleService.create(data);
      return NextResponse.json(role, { status: 201 });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '创建角色失败';
      return NextResponse.json({ message: errorMessage }, { status: 400 });
    }
  }

  static async findAll(req: Request) {
    try {
      const { searchParams } = new URL(req.url);
      const tenantId = searchParams.get('tenantId'); // Can be string or null
      const roles = await RoleService.findAll(tenantId);
      return NextResponse.json(roles);
    } catch (error) {
      return NextResponse.json({ message: '获取角色列表失败' }, { status: 500 });
    }
  }

  static async findOne(id: string) {
    try {
      const role = await RoleService.findOne(id);
      if (!role) {
        return NextResponse.json({ message: '角色不存在' }, { status: 404 });
      }
      return NextResponse.json(role);
    } catch (error) {
      return NextResponse.json({ message: '获取角色信息失败' }, { status: 500 });
    }
  }

  static async update(id: string, req: Request) {
    try {
      const data = (await req.json()) as UpdateRoleDto;
      const role = await RoleService.update(id, data);
      return NextResponse.json(role);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '更新角色失败';
      return NextResponse.json({ message: errorMessage }, { status: 400 });
    }
  }

  static async remove(id: string) {
    try {
      await RoleService.remove(id); // Assuming remove returns void or the role before deletion for mapping
      return NextResponse.json({ message: '角色已删除' }, { status: 200 }); // Or 204 if no content
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '删除角色失败';
      return NextResponse.json({ message: errorMessage }, { status: 400 });
    }
  }
} 